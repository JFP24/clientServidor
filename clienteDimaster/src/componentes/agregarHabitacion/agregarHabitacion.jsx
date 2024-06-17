import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useHotel } from "../../context/hotelContext";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./agregarHabitacion.module.css";
import NavBarLateral from "../navBarLateral/navBarLateral";

const AgregarHabitacion = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const { crearHabitaciones } = useHotel();
  const { getProfile } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const onSubmit = async (data) => {
    try {
      await crearHabitaciones(id, data);
      navigate(`/dashboard/habitaciones/${id}`);
    } catch (error) {
      toast.error("Error al crear la habitación", { autoClose: 5000 });
    }
  };

  const renderInputField = (name, label, rules) => (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <input {...field} id={name} className={styles.input} />}
      />
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );

  return (
    <div className={styles.container}>
      <NavBarLateral />
      <div className={styles.container2}>
        <div className={styles.container3}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.column}>
              {renderInputField("numeroHabitacion", "Número de Habitación", { required: "Número de Habitación es requerido" })}
              {renderInputField("hostLocal", "Host Local", { required: "Host Local es requerido" })}
              {renderInputField("topicLocal", "Tópico Local", { required: "Tópico Local es requerido" })}
            </div>
            <div className={styles.column}>
              {renderInputField("hostExterno", "Host Externo", { required: "Host Externo es requerido" })}
              {renderInputField("topicExterno", "Tópico Externo", { required: "Tópico Externo es requerido" })}
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.button}>Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarHabitacion;
