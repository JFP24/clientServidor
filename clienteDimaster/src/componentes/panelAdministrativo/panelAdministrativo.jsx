import { useState, useEffect } from 'react';
import styles from './panelAdministrativo.module.css';
import { useAuth } from '../../context/authContext';
import { MdLocalLaundryService, MdOutlineCleaningServices, MdMeetingRoom, MdCheckCircle } from 'react-icons/md';
import { TbHotelService } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';
import { useHotel } from '../../context/hotelContext';
import NavBarLateral from '../navBarLateral/navBarLateral.jsx';
import io from 'socket.io-client';

//const socket = io('http://localhost:3000');
const socket = io('https://api-servidor-d8f1.onrender.com');

const PanelAdministrativo = () => {
  const { getProfile, isAuthenticated, profile, logout, user } = useAuth();
  const { conectarMqtt, mensajeMQTT, desconectarMqtt } = useHotel();
  const [habitacionesFiltradas, setHabitacionesFiltradas] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [busquedaNumeroHabitacion, setBusquedaNumeroHabitacion] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 28;

  const idHotel = profile?.userProfile?.hotel.map((e) => e.id);
console.log(user)
  useEffect(() => {
    getProfile(user?.id);
  }, [isAuthenticated]);

  useEffect(() => {
    let habitacionesFiltradasTemp = profile.userProfile?.hotel[0]?.habitaciones || [];
    if (filtro !== 'todos') {
      habitacionesFiltradasTemp = habitacionesFiltradasTemp.filter(habitacion => {
        switch (filtro) {
          case 'ocupada':
            return habitacion?.estado === 'ocupada';
          case 'desocupada':
            return habitacion?.estado === 'desocupada';
          case 'noMolestar':
            return habitacion.noMolestar === 1;
          case 'lavanderia':
            return habitacion.lavanderia === 1;
          case 'houseKeeping':
            return habitacion.houseKeeping === 1;
          case 'puerta':
            return habitacion.puerta === 1;
          case 'checkin':
            return habitacion.checkin === 1;
          default:
            return true;
        }
      });
    }
    if (busquedaNumeroHabitacion) {
      habitacionesFiltradasTemp = habitacionesFiltradasTemp.filter(habitacion =>
        habitacion?.numeroHabitacion?.includes(busquedaNumeroHabitacion)
      );
    }
    setHabitacionesFiltradas(habitacionesFiltradasTemp);
  }, [filtro, busquedaNumeroHabitacion, profile.userProfile?.hotel]);

  useEffect(() => {
    const handleUpdateLavanderia = (data) => {
      console.log(data);
      setHabitacionesFiltradas((prevState) =>
        prevState.map(habitacion =>
          habitacion.habitacionID === data.habitacionID ? { ...habitacion, lavanderia: data.valor } : habitacion
        )
      );
    };

    const handleUpdateNoMolestar = (data) => {
      console.log(data);
      setHabitacionesFiltradas((prevState) =>
        prevState.map(habitacion =>
          habitacion.habitacionID === data.habitacionID ? { ...habitacion, noMolestar: data.valor } : habitacion
        )
      );
    };

    socket.on('updateLavanderia', handleUpdateLavanderia);
    socket.on('updateNoMolestar', handleUpdateNoMolestar);

    return () => {
      socket.off('updateLavanderia', handleUpdateLavanderia);
      socket.off('updateNoMolestar', handleUpdateNoMolestar);
    };
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
    setCurrentFilter(event.target.options[event.target.selectedIndex].text);
  };

  const handleBusquedaNumeroHabitacionChange = (event) => {
    setBusquedaNumeroHabitacion(event.target.value);
  };

  const handleFilterChange = (filterType) => {
    setFiltro(filterType);
    setCurrentFilter(filterType.charAt(0).toUpperCase() + filterType.slice(1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = habitacionesFiltradas.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(habitacionesFiltradas.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className={styles.containerPrincipal}>
      <NavBarLateral idHotel={idHotel} logout={logout} profile={profile} handleFilterChange={handleFilterChange} />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.hotelInfo}>
              <h2 className={styles.h}>{profile?.userProfile?.hotel[0]?.nombre}</h2>
              <h3 className={styles.h}>ADMINISTRACIÓN DE HABITACIONES</h3>
            </div>
            <div className={styles.filters}>
              <div className={styles.filter}>
                <label>Filtro:</label>
                <select value={filtro} onChange={handleFiltroChange}>
                  <option value="todos">Todos</option>
                  <option value="ocupada">Ocupada</option>
                  <option value="desocupada">Desocupada</option>
                  <option value="noMolestar">No molestar</option>
                  <option value="lavanderia">Lavandería</option>
                  <option value="houseKeeping">Housekeeping</option>
                  <option value="puerta">Puerta Abierta</option>
                  <option value="checkin">Check-in</option>
                </select>
              </div>
              <div className={styles.filter}>
                <label>Buscar habitación:</label>
                <input type="text" value={busquedaNumeroHabitacion} onChange={handleBusquedaNumeroHabitacionChange} placeholder="Ej. 102" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statsAndLegend}>
          <div className={styles.ocupaciones}>
            <div className={styles.habOcupadas}>
              Ocupadas: {profile.userProfile?.hotel[0]?.habitaciones?.filter(habitacion => habitacion?.estado === 'ocupada').length || 0}
            </div>
            <div className={styles.habDesocupadas}>
              Desocupadas: {profile.userProfile?.hotel[0]?.habitaciones?.filter(habitacion => habitacion?.estado === 'desocupada').length || 0}
            </div>
          </div>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <TbHotelService className={styles.noMolestarIcon} /> No molestar
            </div>
            <div className={styles.legendItem}>
              <MdLocalLaundryService className={styles.lavanderiaIcon} /> Lavandería
            </div>
            <div className={styles.legendItem}>
              <MdOutlineCleaningServices className={styles.houseKeepingIcon} /> Housekeeping
            </div>
            <div className={styles.legendItem}>
              <MdMeetingRoom className={styles.puertaIcon} /> Puerta Abierta
            </div>
            <div className={styles.legendItem}>
              <MdCheckCircle className={styles.checkinIcon} /> Check-in
            </div>
          </div>
        </div>
        <div className={styles.currentFilter}>
          <p><strong>{currentFilter.toUpperCase() || 'TODOS'}</strong></p>
        </div>
        {profile?.userProfile?.hotel[0]?.habitaciones.length !== 0 ? (
          <div className={styles.gridContainer}>
            {currentItems.map((habitacion) => (
              <div key={habitacion._id} className={styles.roomCardLink}>
                <div className={`${styles.roomCard} ${styles[habitacion.estado]}`}>
                  <div className={`${styles.cardHeader} ${styles[habitacion.estado]}`}>
                    <div className={styles.roomNumber}>
                      HAB {habitacion.numeroHabitacion}
                    </div>
                    <span className={styles.roomStatus}>
                      {habitacion.estado === 'ocupada' ? <FaUsers className={styles.ocupadaIcon} /> : <FaUsers className={styles.desocupadaIcon} />}
                    </span>
                  </div>
                  <div className={styles.iconsContainer}>
                    {profile?.userProfile?.rol === 'servicio' ? (
                      <>
                        <MdLocalLaundryService className={`${styles.icon} ${habitacion.lavanderia === 1 ? styles.lavanderia : ''}`} title="Lavandería" />
                        <MdOutlineCleaningServices className={`${styles.icon} ${habitacion.houseKeeping === 1 ? styles.houseKeeping : ''}`} title="Housekeeping" />
                      </>
                    ) : (
                      <>
                        <TbHotelService className={`${styles.icon} ${habitacion.noMolestar === 1 ? styles.noMolestar : ''}`} title="No molestar" />
                        <MdLocalLaundryService className={`${styles.icon} ${habitacion.lavanderia === 1 ? styles.lavanderia : ''}`} title="Lavandería" />
                        <MdOutlineCleaningServices className={`${styles.icon} ${habitacion.houseKeeping === 1 ? styles.houseKeeping : ''}`} title="Housekeeping" />
                        <MdMeetingRoom className={`${styles.icon} ${habitacion.puerta === 1 ? styles.puerta : ''}`} title="Puerta" />
                        <MdCheckCircle className={`${styles.icon} ${habitacion.checkin === 1 ? styles.checkin : ''}`} title="Check-in" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>NO HAY HABITACIONES CREADAS ACTUALMENTE</div>
        )}
        <div className={styles.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)} className={currentPage === number ? styles.active : ''}>
              {number}
            </button>
          ))}
          <button onClick={nextPage} disabled={currentPage === pageNumbers.length}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelAdministrativo;
