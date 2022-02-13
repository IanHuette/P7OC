import React, {useEffect} from 'react';
import logo from '../assets/icon.png';
import '../styles/components/Banner.css';
import { Link, useLocation } from "react-router-dom";


const testFunction = () => {
    
    console.log("test");
}

const Banner = () => {
    const location = useLocation();

    const title = 'Groupomania';
    let username = ' '; 

    useEffect(async() => {
        let userDataFromLocalStorage = localStorage.getItem('userData');
        if (userDataFromLocalStorage != null && userDataFromLocalStorage != undefined) {
            const userDataFromLocalStorageParsed = JSON.parse(userDataFromLocalStorage);
            username = userDataFromLocalStorageParsed.username ? userDataFromLocalStorageParsed.username: ' ';
        }
    }, []); 
 
    return (
        <div className="gpm-banner">
            <h1 className='gpm-title'><img src={logo} alt='Groupomania' className='gpm-logo' />{title}</h1>
            {location.pathname === "/" &&
            <div className='nav'>
                <Link to ="../profil"><input id="inputName" className="profilbutton" type="button" value ={username} onClick={testFunction}/><i className="fa-solid fa-user"></i></Link>
            </div>
            }
            
            {location.pathname === "/login" &&
            <div className='nav'>
                <Link to ="../signup"><input id="inputName" className="profilbutton" type="button" value ="S'inscrire" onClick={testFunction}/><i className="fa-solid fa-user"></i></Link>
            </div>
            }

            {location.pathname === "/signup" &&
            <div className='nav'>
                <Link to ="../login"><input id="inputName" className="profilbutton" type="button" value = 'Se Connecter' onClick={testFunction}/><i className="fa-solid fa-user"></i></Link>
            </div>
            }       
        </div>
    );

};
export default Banner;
