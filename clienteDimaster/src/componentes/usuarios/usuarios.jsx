import React, { useState, useEffect } from 'react';
import styles from './usuarios.module.css'; // Importamos los estilos CSS
import NavBarLateral from '../navBarLateral/navBarLateral';
import { useAuth } from '../../context/authContext';
import { useHotel } from '../../context/hotelContext';

const Usuarios = () => {
  const { usuarioTodos, actualizarUser, users } = useAuth();
  const { getHoteles, hotel } = useHotel();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    usuarioTodos();
    getHoteles();
  }, []);

  const handleAssignHotel = async () => {
    if (selectedUser && selectedHotel) {
      await actualizarUser(selectedUser.id, { hotel: selectedHotel });
      usuarioTodos(); // Actualiza la lista de usuarios
      setSelectedHotel(null);
    }
  };

  const handleAssignRole = async () => {
    if (selectedUser && selectedRole) {
      await actualizarUser(selectedUser.id, { rol: selectedRole });
      usuarioTodos(); // Actualiza la lista de usuarios
      setSelectedRole('');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <NavBarLateral />
      <div className={styles.container}>
        <h1>Gestión de Usuarios</h1>
        <div className={styles.lists}>
          <div className={styles.list}>
            <h2>Lista de Usuarios</h2>
            <ul>
              {users?.map(usuario => (
                <li
                  key={usuario.id}
                  onClick={() => setSelectedUser(usuario)}
                  className={`${styles.userItem} ${selectedUser?.id === usuario.id ? styles.selected : ''}`}
                >
                  <div>
                    <strong>Nombre:</strong> {usuario.username}
                  </div>
                  <div>
                    <strong>Email:</strong> {usuario.email}
                  </div>
                  <div>
                    <strong>Rol:</strong> {usuario.rol}
                  </div>
                  <div>
                    <strong>Hotel Asignado:</strong> {usuario.hotel ? usuario.hotel.nombre : 'Ninguno'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.list}>
            <h2>Lista de Hoteles</h2>
            <ul>
              {hotel?.map(hotel => (
                <li
                  key={hotel.id}
                  onClick={() => setSelectedHotel(hotel.id)}
                  className={`${styles.hotelItem} ${selectedHotel === hotel.id ? styles.selected : ''}`}
                >
                  {hotel.nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedUser && (
          <div className={styles.actions}>
            <h2>Asignar Hotel o Rol a {selectedUser.username}</h2>
            <div className={styles.assign}>
              <h3>Asignar Hotel</h3>
              <select onChange={(e) => setSelectedHotel(e.target.value)} value={selectedHotel || ''}>
                <option value="">Seleccionar Hotel</option>
                {hotel?.map(hotel => (
                  <option key={hotel.id} value={hotel.id}>{hotel.nombre}</option>
                ))}
              </select>
              <button onClick={handleAssignHotel}>Asignar Hotel</button>
            </div>
            <div className={styles.assign}>
              <h3>Asignar Rol</h3>
              <select onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole}>
                <option value="">Seleccionar Rol</option>
                <option value="Admin">Admin</option>
                <option value="servicio">Servicio</option>
                <option value="Usuario">Usuario</option>
              </select>
              <button onClick={handleAssignRole}>Asignar Rol</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Usuarios;
