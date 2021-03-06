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
            <h1 className='gpm-title'><img src={logo} alt='' className='gpm-logo' />{title}</h1>
            {location.pathname === "/" &&
            <div className='nav'>
                <Link to ="../profil" aria-label='Profil'><i className="fa-solid fa-user"></i><input id="inputName" className="profilbutton" type="button" value ={username} /></Link>
            </div>
            }
            {location.pathname === "/profil" &&
            <div className='btnleft'>
                <Link to ="../" aria-label='Home'><i className="fa-solid fa-arrow-left"></i></Link>
            </div>
            }
            {location.pathname.startsWith("/comments") &&
            <div className='btnleft'>
                <div className='nav'>
                    <Link to ="../profil" aria-label='Profil'><i className="fa-solid fa-user"></i><input id="inputName" className="profilbutton" type="button" value ={username} /></Link>
                </div>
                <Link to ="../" aria-label='Home'><i className="fa-solid fa-arrow-left"></i></Link>
            </div>
            }
        </div>
    );

};
export default Banner;
