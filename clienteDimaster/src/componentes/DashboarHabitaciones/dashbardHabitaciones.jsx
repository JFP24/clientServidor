import React, { useEffect, useState } from 'react';
import styles from './dashboardHabitaciones.module.css'; // Importamos los estilos CSS
import { useHotel } from '../../context/hotelContext.jsx';
import { Link, useParams } from "react-router-dom";
import NavBarLateral from '../navBarLateral/navBarLateral';

const DashboardHabitaciones = () => {
  const { id } = useParams();
  const {  hotelid, eliminarHabitaciones, actualizarHabitaciones } = useHotel();
  const [showForm, setShowForm] = useState(false);
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 

  const handleEliminarHabitacion = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta habitacion?");
    if (confirmacion) {
      await eliminarHabitaciones(id);
      window.location.reload();
    }
  };

  const handleActualizarHabitacion = (habitacion) => {
    setSelectedHabitacion(habitacion);
    setShowForm(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setSelectedHabitacion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await actualizarHabitaciones(selectedHabitacion._id, selectedHabitacion);
    setShowForm(false);
    window.location.reload();
  };


  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hotelid?.habitaciones?.slice(indexOfFirstItem, indexOfLastItem) || [];

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((hotelid?.habitaciones?.length || 0) / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.containerPpal}>
      <NavBarLateral />
      <div className={styles.hasbita}>
        <div className={styles.dimasters}>
          <Link to={`/agregarHabitacion/${id}`}>
            <button className={styles.agregar}>Agregar Habitaciones nueva</button>
          </Link>
          <Link to={`/informes`}>
            <button className={styles.agregar}>INFORMES</button>
          </Link>
        </div>
        <div className={styles.habita}>
          <div>NroHabitacion</div>
          <div>IP LOCAL</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        <div>
          {currentItems.map(e => (
            <div className={styles.habitaciones} key={e.numeroHabitacion}>
              <div>{e.numeroHabitacion?.toUpperCase()}</div>
              <div>{e.hostLocal}</div>
              <div>{e.hostExterno}</div>
              <div>
                <button className={styles.eliminar} onClick={() => handleEliminarHabitacion(e._id)}>Eliminar</button>
                <button className={styles.actualizar} onClick={() => handleActualizarHabitacion(e)}>Actualizar</button>
                <Link to={`/pruebas/${e._id}`}>
                  <button className={styles.detalles}>Dimaster</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {showForm && (
          <div className={styles.overlay}>
            <div className={styles.formContainer}>
              <form onSubmit={handleFormSubmit}>
                <h2>Actualizar Habitación</h2>
                <div className={styles.columnContainer}>
                  <div className={styles.column}>
                    <label>
                      Habitación:
                      <input
                        type="text"
                        name="numeroHabitacion"
                        value={selectedHabitacion.numeroHabitacion}
                        onChange={handleFormChange}
                      />
                    </label>
                    <label>
                      Estado:
                      <input
                        type="text"
                        name="estado"
                        value={selectedHabitacion.estado}
                        onChange={handleFormChange}
                      />
                    </label>
                    <label>
                      No molestar:
                      <input
                        type="text"
                        name="noMolestar"
                        value={selectedHabitacion.noMolestar}
                        onChange={handleFormChange}
                      />
                    </label>
                    <label>
                      Lavandería:
                      <input
                        type="text"
                        name="lavanderia"
                        value={selectedHabitacion.lavanderia}
                        onChange={handleFormChange}
                      />
                    </label>
                  </div>
                  <div className={styles.column}>
                    <label>
                      Housekeeping:
                      <input
                        type="text"
                        name="houseKeeping"
                        value={selectedHabitacion.houseKeeping}
                        onChange={handleFormChange}
                      />
                    </label>
                    <label>
                      Puerta:
                      <input
                        type="text"
                        name="puerta"
                        value={selectedHabitacion.puerta}
                        onChange={handleFormChange}
                      />
                    </label>
                    <label>
                      Check-in:
                      <input
                        type="text"
                        name="checkin"
                        value={selectedHabitacion.checkin}
                        onChange={handleFormChange}
                      />
                    </label>
                    <label>
                      Host Local:
                      <input
                        type="text"
                        name="hostLocal"
                        value={selectedHabitacion.hostLocal}
                        onChange={handleFormChange}
                      />
                    </label>
                  </div>
                  <div className={styles.column}>
                    <label>
                      Topic Externo:
                      <input
                        type="text"
                        name="topicExterno"
                        value={selectedHabitacion.topicExterno}
                        onChange={handleFormChange}
                      />
                    </label>
                    <label>
                      Topic Local:
                      <input
                        type="text"
                        name="topicLocal"
                        value={selectedHabitacion.topicLocal}
                        onChange={handleFormChange}
                      />
                    </label>
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.button}>Actualizar</button>
                  <button type="button" className={styles.button} onClick={() => setShowForm(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className={styles.pagination}>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className={currentPage === number ? styles.active : ''}>
              {number}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHabitaciones;
