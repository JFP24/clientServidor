import React, { useState, useEffect } from 'react';
import { useHotel } from "../../context/hotelContext.jsx"
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import styles from './pruebas.module.css';
import { io } from 'socket.io-client';
import { Link } from "react-router-dom"
import NavBarLateral from '../navBarLateral/navBarLateral.jsx';


const Pruebas = () => {
    const { id } = useParams();
    const { mensaje , conectarMqtt, desconectarMqtt, mensajes } = useHotel();
    const [historialMensajes, setHistorialMensajes] = useState([]);
    const [socket, setSocket] = useState(null);
    const [conector , setConector] = useState(true)

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conexión WebSocket exitosa');
        });

        newSocket.on('mqttData', (mensaje) => {
            // Imprime el mensaje recibido
            console.log(mensaje);
            
            if (mensaje.includes("module")) {
                const objetoJSON = JSON.parse(mensaje);
                
                let objetosString = objetoJSON.data.map((e) => {
                    return `${e.id} : ${JSON.stringify({
                        id: e.id,
                        Nombre: e.n,
                        Descripcion: e.d,
                        Valor: e.v
                    })}`;
                });
            
                // Unir los objetos en una sola cadena con un salto de línea entre cada uno
                let cadenaOrdenada = objetosString.join('\n\n\n'); // Agregar un segundo '\n' para un espacio adicional
                console.log(cadenaOrdenada);
                setHistorialMensajes(prevHistorial => [cadenaOrdenada, ...prevHistorial]);
            } else {
                setHistorialMensajes(prevHistorial => [mensaje, ...prevHistorial]);
                   }
        });

        // Cleanup function to remove the listener and disconnect the socket
        return () => {
            newSocket.off('mqttData'); // Remove the specific listener
            newSocket.disconnect(); // Disconnect the socket
        };
    }, []); 

  
   // console.log(historialMensajes,"desde historial de mensajes")
    const [inputValues, setInputValues] = useState({
        input1: "01_toggle1%",
        input2: "01_on1%",
        input3: "01_of1%",
        input4: "01_of2%",
        input5: {"cmd":"get","module":"FUNCTIONS","start":1,"end":399},
        input6: "fun_XXX%",
        input7: "var_XXX?%",
        input8: "var_XXX==200%",
        input9: "01_GRABAR_TECLA_001%",
        input10: "01_TECLA_001%"
    });

    const handleConectarExternamente = async () => {
        await conectarMqtt(id);
        setConector(false)
    }

    const handleDesconectarExternamente = async () => {
        await desconectarMqtt(id);
        setConector(true)
    }

    const enviarMensaje = async (mensaje) => {
        console.log(mensaje);
        const data = { mensaje };
        await mensajes(id, data);
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // Aquí puedes enviar el comando cada minuto
    //         const mensaje = "var_200?%";
    //         enviarMensaje(mensaje);
    //     }, 3000); // 60000 ms = 1 minuto

    //     return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
    // }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEnviarClick = async (inputName) => {
        const mensaje = inputValues[inputName];
        if (mensaje) {
            await enviarMensaje(mensaje);
        }
    };

  

    return (
        <div className={styles.containerPrincipal}>
            <NavBarLateral/>
            
            
            <div className={styles.container}>
            <div className={styles.conectar}>
                <Link to={`/dashboard/habitaciones/${id}`}> 
    <button onClick={handleDesconectarExternamente} className={styles.volver}>Regresar</button>
    </Link>
                {conector ?  <button className={styles.conectarExterno} onClick={handleConectarExternamente}>Conectar Dimaster externamente</button>
                        :  <button className={styles.desconectarExterno} onClick={handleDesconectarExternamente}>Desconectar Dimaster externamente</button>
                }
                <div className={styles.mensaje}>
                {mensaje}
                </div>
               
                </div>
              <div className={styles.area}>
              <div className={styles.inputsContainer}>
                    {[...Array(10)].map((_, index) => (
                        <div key={`input${index + 1}`} className={styles.inputWrapper}>
                            <input
        type="text"
        className={styles.input}
        name={`input${index + 1}`}
        value={typeof inputValues[`input${index + 1}`] === 'object' ? JSON.stringify(inputValues[`input${index + 1}`]) : inputValues[`input${index + 1}`]}
        onChange={handleInputChange}
    />
    <button
        type="button"
        className={styles.button}
        onClick={() => handleEnviarClick(`input${index + 1}`)}
    >
        Enviar
    </button>
                        </div>
                    ))}
                </div>
                <div className={styles.textAreaContainer}>
                    <textarea className={styles.textArea} value={historialMensajes.join('\n\n') } readOnly></textarea>
                </div>
              </div>
            </div>
        
        </div>
    );
}

export default Pruebas;
