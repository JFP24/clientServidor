import React from 'react';
import styles from './perfil.module.css'; // Importamos los estilos CSS
import { FaUser, FaEnvelope, FaPhone, FaMapMarker, FaUserTie, FaCalendarAlt, FaBuilding, FaEdit, FaSave } from 'react-icons/fa';
import NavBarLateral from '../navBarLateral/navBarLateral';
import usuario from "../../assets/usuario.png";

const PerfilAdministrador = ({ administrador }) => {
  return (
    <div className={styles.container}>
      <NavBarLateral />
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <h2>Perfil del Administrador</h2>
            <div className={styles.imageContainer}>
              <img src={usuario} alt="Imagen de Perfil" className={styles.profileImage} />
            </div>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.infoItem}>
              <FaUser className={styles.infoIcon} />
              <p>Nombre: JUAN FELIPE PULGARIN GARCIA</p>
            </div>
            <div className={styles.infoItem}>
              <FaEnvelope className={styles.infoIcon} />
              <p>Correo Electrónico: jpulgaringarcia@gmail.com</p>
            </div>
            <div className={styles.infoItem}>
              <FaPhone className={styles.infoIcon} />
              <p>Teléfono: 3013624649</p>
            </div>
            <div className={styles.infoItem}>
              <FaUserTie className={styles.infoIcon} />
              <p>Rol: Administrador</p>
            </div>
            <div className={styles.infoItem}>
              <FaMapMarker className={styles.infoIcon} />
              <p>Dirección: Medellin</p>
            </div>
            <div className={styles.infoItem}>
              <FaCalendarAlt className={styles.infoIcon} />
              <p>Fecha de Nacimiento: 01/01/1980</p>
            </div>
            <div className={styles.infoItem}>
              <FaBuilding className={styles.infoIcon} />
              <p>Departamento: Tecnologías de la Información</p>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.editButton}>
                <FaEdit /> Editar
              </button>
              <button className={styles.saveButton}>
                <FaSave /> Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilAdministrador;
