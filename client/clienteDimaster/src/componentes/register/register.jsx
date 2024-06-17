import styles from "./register.module.css";
import image5 from "../../assets/imagen6.jpeg";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoNegro from "../../assets/logo_negro.png";
import Footer from "../footer/footer";
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors, error } = useAuth();
  const navigate = useNavigate();

  console.log(error);

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    signup(values);
  });

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={image5} alt="Imagen de fondo" />
       
      </div>
      <div className={styles.form}>
        <form className={styles.formLabel} onSubmit={onSubmit}>
          <div>
            <img src={logoNegro} alt="imagenDiseve" className={styles.logoNegro} />
          </div>
          <div>
            <p className={styles.bienvenida}>¡Hola! Aquí puedes registrarte.</p>
          </div>
          <div className={styles.segundo}>Llena los siguientes datos</div>
          <div className={styles.error}>{error.message}</div>
          {registerErrors && <div className={styles.errorMessage}>{registerErrors}</div>}
          <input className={styles.input} type="text" placeholder="Email" id="email" name="email" {...register("email", { required: true })} />
          {errors.email && <div className={styles.errorMessage}>Este campo es requerido</div>}
          <input className={styles.input} type="text" id="username" name="username" placeholder="Nombre de Usuario" {...register("username", { required: true })} />
          {errors.username && <div className={styles.errorMessage}>Este campo es requerido</div>}
          <input className={styles.input} type="password" id="password" name="password" placeholder="Contraseña" {...register("password", { required: true })} />
          {errors.password && <div className={styles.errorMessage}>Este campo es requerido</div>}
          <button className={styles.button} type="submit">Registrarse</button>
          <div className={styles.singUp}>
            ¿Ya tienes una cuenta? <Link to="/login" className={styles.link}>Inicia Sesión aquí</Link>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Register;
