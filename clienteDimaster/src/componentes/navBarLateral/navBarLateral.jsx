import React, { useState, useEffect } from 'react';
import styles from './navBarLateral.module.css';
import { FaBed, FaUserTie, FaBoxOpen, FaQuestionCircle, FaTools, FaSignOutAlt, FaBars, FaExclamationCircle, FaChevronDown, FaBroom } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdLocalLaundryService, MdOutlineCleaningServices, MdMeetingRoom, MdCheckCircle } from 'react-icons/md';
import { TbHotelService } from 'react-icons/tb';
import { IoMdBeer } from "react-icons/io";
import logo from '../../assets/LogoDiseven en blanco-02.png';
import io from 'socket.io-client';

//const socket = io('http://localhost:3000');
const socket = io('https://api-servidor-d8f1.onrender.com');

const NavBarLateral = ({ idHotel, logout, profile, handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminSubMenuOpen, setIsAdminSubMenuOpen] = useState(false);
  const [isServiceSubMenuOpen, setIsServiceSubMenuOpen] = useState(false);

  const [lavanderiaCount, setLavanderiaCount] = useState(0);
  const [noMolestarCount, setNoMolestarCount] = useState(0);
  const [houseKeepingCount, setHouseKeepingCount] = useState(0);

  useEffect(() => {
    if (profile?.userProfile?.hotel?.length > 0 && profile.userProfile.hotel[0]?.habitaciones) {
      const noMolestar = profile.userProfile.hotel[0].habitaciones.filter(habitacion => habitacion.noMolestar === 1).length;
      const houseKeeping = profile.userProfile.hotel[0].habitaciones.filter(habitacion => habitacion.houseKeeping === 1).length;

      setLavanderiaCount(profile.userProfile.hotel[0].habitaciones.filter(habitacion => habitacion.lavanderia === 1).length);
      setNoMolestarCount(noMolestar);
      setHouseKeepingCount(houseKeeping);
    } else {
      setLavanderiaCount(0);
      setNoMolestarCount(0);
      setHouseKeepingCount(0);
    }
  }, [profile]);

  useEffect(() => {
    socket.on('updateNoMolestar', (data) => {
      setNoMolestarCount(data.valor);
    });

    socket.on('updateLavanderia', (data) => {
      setLavanderiaCount(data.valor);
    });

    socket.on('housekeeping', (data) => {
      setHouseKeepingCount(data.valor);
    });

    return () => {
      socket.off('updateNoMolestar');
      socket.off('updateLavanderia');
      socket.off('housekeeping');
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (filterType) => {
    handleFilterChange(filterType);
  };

  const toggleAdminSubMenu = () => {
    setIsAdminSubMenuOpen(!isAdminSubMenuOpen);
  };

  const toggleServiceSubMenu = () => {
    setIsServiceSubMenuOpen(!isServiceSubMenuOpen);
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
            {profile?.userProfile?.hotel?.length > 0 && profile.userProfile.hotel[0] && (
              <>
                {lavanderiaCount > 0 && (
                  <li className={styles.li} onClick={() => handleNotificationClick('lavanderia')}>
                    <Link className={styles.a} to="#">
                      <MdLocalLaundryService className={styles.icon}/> Lavandería <span className={styles.notification}>{lavanderiaCount}</span>
                    </Link>
                  </li>
                )}
                {noMolestarCount > 0 && (
                  <li className={styles.li} onClick={() => handleNotificationClick('noMolestar')}>
                    <Link className={styles.a} to="#">
                      <TbHotelService className={styles.icon}/> No Molestar <span className={styles.notification}>{noMolestarCount}</span>
                    </Link>
                  </li>
                )}
                {houseKeepingCount > 0 && (
                  <li className={styles.li} onClick={() => handleNotificationClick('houseKeeping')}>
                    <Link className={styles.a} to="#">
                      <MdOutlineCleaningServices className={styles.icon}/> Housekeeping <span className={styles.notification}>{houseKeepingCount}</span>
                    </Link>
                  </li>
                )}
              </>
            )}
            <li className={styles.li}><Link className={styles.a} to="/perfil"><FaUserTie className={styles.icon}/> Perfil</Link></li>
            {profile?.userProfile?.rol === 'Admin' && (
              <li className={styles.li} onClick={toggleAdminSubMenu}>
                <Link className={styles.a} to="#"><FaTools className={styles.icon}/> Administrar <FaChevronDown className={`${styles.chevron} ${isAdminSubMenuOpen ? styles.open : ''}`} /></Link>
                {isAdminSubMenuOpen && (
                  <ul className={styles.subMenu}>
                    <li className={styles.subLi}><Link className={styles.a} to="/dashboard/hoteles">Hoteles</Link></li>
                    <li className={styles.subLi}><Link className={styles.a} to="/dashboard/usuarios">Usuarios</Link></li>
                    <li className={styles.subLi}><Link className={styles.a} to="/informes">Informes</Link></li>
                  </ul>
                )}
              </li>
            )}
            {profile?.userProfile?.rol === 'servicio' && (
              <li className={styles.li} onClick={toggleServiceSubMenu}>
                <Link className={styles.a} to="#"><FaBroom className={styles.icon}/> Servicio <FaChevronDown className={`${styles.chevron} ${isServiceSubMenuOpen ? styles.open : ''}`} /></Link>
                {isServiceSubMenuOpen && (
                  <ul className={styles.subMenu}>
                    {noMolestarCount > 0 && (
                      <li className={styles.subLi} onClick={() => handleNotificationClick('noMolestar')}>
                        <Link className={styles.a} to="#">No Molestar <span className={styles.notification}>{noMolestarCount}</span></Link>
                      </li>
                    )}
                    {houseKeepingCount > 0 && (
                      <li className={styles.subLi} onClick={() => handleNotificationClick('houseKeeping')}>
                        <Link className={styles.a} to="#">Housekeeping <span className={styles.notification}>{houseKeepingCount}</span></Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            )}
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
