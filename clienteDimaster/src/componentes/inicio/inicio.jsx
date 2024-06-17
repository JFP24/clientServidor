import React from 'react';
import styles from './inicio.module.css'; // Importamos los estilos CSS
import { Link } from "react-router-dom"

const LoginInicio = () => {
  return (
    <div className={styles.contenedor}>
      <div className={styles.bienvenido}>Bienvenido</div>
      <Link to={"/login"}>
        <button className={styles.button}> INICIAR SESION </button>
      </Link>
    </div>
  );
}

export default LoginInicio;
