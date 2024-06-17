import React, { useEffect, useState } from 'react';
import styles from './dashboardHoteles.module.css'; // Importamos los estilos CSS
import { useHotel } from '../../context/hotelContext.jsx';
import { Link } from "react-router-dom";
import NavBarLateral from '../navBarLateral/navBarLateral';

const DashboardHoteles = () => {
  const { getHoteles, hotel, eliminarHoteles, actualizarHoteles } = useHotel();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [formData, setFormData] = useState({
    nombre: ''
  });

  useEffect(() => {
    getHoteles();
  }, []);

  const handleEliminarHotel = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este hotel?");
    if (confirmacion) {
      await eliminarHoteles(id);
      window.location.reload();
    }
  };

  const handleActualizarHotel = (hotel) => {
    setCurrentHotel(hotel);
    setFormData({ nombre: hotel.nombre });
    setShowUpdateForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await actualizarHoteles(currentHotel.id, formData);
    setShowUpdateForm(false);
    window.location.reload();
  };

  return (
    <div className={styles.containerPpal}>
      <NavBarLateral />
      <div className={styles.containerHotel}>
        <div className={styles.list1}>
          <div>HOTEL</div>
          <div>DIRECCIÓN</div>
          <div>DETALLES</div>
        </div>
        <div>
          {hotel?.map(e => (
            <div className={styles.hoteles} key={e.id}>
              <div className={styles.nombre}>{e.nombre}</div>
              <div>MEDELLÍN</div>
              <div className={styles.buttonContainer}>
                <Link to={`/dashboard/habitaciones/${e.id}`}>
                  <button className={styles.detalles}>Detalles</button>
                </Link>
                <button className={styles.eliminar} onClick={() => handleEliminarHotel(e.id)}>Eliminar</button>
                <button className={styles.actualizar} onClick={() => handleActualizarHotel(e)}>Actualizar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showUpdateForm && (
        <div className={styles.overlay}>
          <div className={styles.updateFormContainer}>
            <h2>Actualizar Hotel</h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="nombre" className={styles.label}>Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleFormChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="direccion" className={styles.label}>Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleFormChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.guardar}>Guardar</button>
                <button type="button" className={styles.cancelar} onClick={() => setShowUpdateForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardHoteles;
