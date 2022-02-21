import React from 'react';
import logo from '../assets/icon.png';
import '../styles/components/Banner.css';
import { Link, useLocation } from "react-router-dom";


const Banner = () => {
    const location = useLocation();
    const title = 'Groupomania';

    /**
 * PRENDRE DE FACON DYNAMIQUE LE PSEUDO DE L'USER CONNECTÉ
 */
    let username = ' '
    let userDataFromLocalStorage = localStorage.getItem('userData');
    if (userDataFromLocalStorage != null && userDataFromLocalStorage != undefined) {
        const userDataFromLocalStorageParsed = JSON.parse(userDataFromLocalStorage);
        username = userDataFromLocalStorageParsed.username ? userDataFromLocalStorageParsed.username: ' ';
    }
    
    return (
        <div className="gpm-banner">
            <div>
                <h1 className='gpm-title'><img src={logo} alt='Groupomania' className='gpm-logo' />{title}</h1>
            </div>
            {location.pathname === "/" &&
            <div className='nav'>
                <Link to ="../profil"><i className="fa-solid fa-user"></i><input id="inputName" className="profilbutton" type="button" value ={username} /></Link>
            </div>
            }
        </div>
    );

};
export default Banner;
