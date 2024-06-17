import React, { useState, useEffect } from 'react';
import styles from './navBarLateral.module.css';
import { FaBed, FaUserTie, FaBoxOpen, FaChartLine, FaQuestionCircle, FaTools, FaSignOutAlt, FaBars, FaExclamationCircle, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/LogoDiseven en blanco-02.png';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Asegúrate de que la URL coincida con tu servidor

const NavBarLateral = ({ idHotel, logout, profile, handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Estado para controlar el submenú

  const [lavanderiaCount, setLavanderiaCount] = useState(0);
  const [noMolestarCount, setNoMolestarCount] = useState(0);
  const [houseKeepingCount, setHouseKeepingCount] = useState(0);

  useEffect(() => {
    if (profile?.userProfile?.hotel[0]?.habitaciones) {
      const lavanderia = profile.userProfile.hotel[0].habitaciones.filter(habitacion => habitacion.lavanderia === 1).length;
      const noMolestar = profile.userProfile.hotel[0].habitaciones.filter(habitacion => habitacion.noMolestar === 1).length;
      const houseKeeping = profile.userProfile.hotel[0].habitaciones.filter(habitacion => habitacion.houseKeeping === 1).length;

      setLavanderiaCount(lavanderia);
      setNoMolestarCount(noMolestar);
      setHouseKeepingCount(houseKeeping);
    }
  }, [profile]);
  useEffect(() => {
    socket.on('updateNoMolestar', (data) => {
     // console.log(data)
      setNoMolestarCount(data.valor)
    });
  },[])
  useEffect(() => {
    socket.on('updateLavanderia', (data) => {
    //  console.log(data)
      setLavanderiaCount(data.valor)
    });
  },[])
  useEffect(() => {
    socket.on('updateNoAseo', (data) => {
      console.log(data)
      setHouseKeepingCount(data.valor)
    });
  },[])

  const handleLogout = () => {
    logout();
  };

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (filterType) => {
    handleFilterChange(filterType);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.burgerMenu} onClick={toggleNavBar}>
        <FaBars />
      </div>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <nav>
          <ul className={styles.nav}>
            <li className={styles.li} onClick={() => handleFilterChange('todos')}>
              <Link className={styles.a} to="/panelAdministrativo"><FaBed className={styles.icon}/> Habitaciones</Link>
            </li>
            {lavanderiaCount > 0 && (
              <li className={styles.li} onClick={() => handleNotificationClick('lavanderia')}>
                <Link className={styles.a} to="#">
                  <FaBoxOpen className={styles.icon}/> Lavandería <span className={styles.notification}>{lavanderiaCount}</span>
                </Link>
              </li>
            )}
            {noMolestarCount > 0 && (
              <li className={styles.li} onClick={() => handleNotificationClick('noMolestar')}>
                <Link className={styles.a} to="#">
                  <FaExclamationCircle className={styles.icon}/> No Molestar <span className={styles.notification}>{noMolestarCount}</span>
                </Link>
              </li>
            )}
            {houseKeepingCount > 0 && (
              <li className={styles.li} onClick={() => handleNotificationClick('houseKeeping')}>
                <Link className={styles.a} to="#">
                  <FaTools className={styles.icon}/> Housekeeping <span className={styles.notification}>{houseKeepingCount}</span>
                </Link>
              </li>
            )}
            <li className={styles.li}><Link className={styles.a} to="/perfil"><FaUserTie className={styles.icon}/> Perfil</Link></li>
            <li className={styles.li}><Link className={styles.a} to="#"><FaQuestionCircle className={styles.icon}/> Ayuda</Link></li>
            <li className={styles.li} onClick={toggleSubMenu}>
              <Link className={styles.a} to="#"><FaTools className={styles.icon}/> Administrar <FaChevronDown className={styles.chevron} /></Link>
              {isSubMenuOpen && (
                <ul className={styles.subMenu}>
                  <li className={styles.subLi}><Link className={styles.a} to="/dashboard/hoteles">Hoteles</Link></li>
                  <li className={styles.subLi}><Link className={styles.a} to="/dashboard/usuarios">Usuarios</Link></li>
                  {/* <li className={styles.subLi}><Link className={styles.a} to="/dashboard/estadisticas">Estadísticas</Link></li> */}
                </ul>
              )}
            </li>
          </ul>
        </nav>
        <div className={styles.logout}>
          <Link className={styles.a} onClick={handleLogout}><FaSignOutAlt className={styles.icon}/> Cerrar sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBarLateral;
