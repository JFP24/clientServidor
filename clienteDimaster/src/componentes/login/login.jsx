import React from 'react';
import styles from "./login.module.css";
import image5 from "../../assets/imagen1.jpg"
import { useAuth } from "../../context/authContext.jsx"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import logoNegro from "../../assets/logo_negro.png"
import Footer from "../footer/footer";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, error, isAuthenticated } = useAuth()
  const navigate = useNavigate()
console.log(error)
  const onSubmit = handleSubmit((data) => {
    signin(data)
  })

  useEffect(() => {
    if (isAuthenticated) navigate("/panelAdministrativo")
  }, [isAuthenticated, navigate])

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={image5} alt="Imagen de fondo" />
      </div>
      <div className={styles.form}>
        <form className={styles.formLabel} onSubmit={onSubmit}>
          <div>
            <img src={logoNegro} alt="Diseven Logo" className={styles.logoNegro} />
          </div>
          <p className={styles.bienvenida}>¡Hola! Bienvenido a esta gran experiencia tecnológica.</p>
          <p className={styles.segundo}>Continúa con la experiencia</p>
          <div className={styles.error}>{error[0]}</div>
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <span className={styles.errorMessage}>El email es requerido</span>}
          </div>
          <div>
            <input
              className={styles.input}
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
            {errors.password && <span className={styles.errorMessage}>La contraseña es requerida</span>}
          </div>
          <div className={styles.ForgotPassword}>¿Olvidaste tu Contraseña?</div>
          <button className={styles.button} type="submit">Iniciar Sesión</button>
          <div className={styles.singUp}>
            ¿Aún no tienes una cuenta? <Link to="/register" className={styles.link}>Regístrate aquí</Link>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
