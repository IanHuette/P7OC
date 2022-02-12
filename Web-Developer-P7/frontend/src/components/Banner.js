import React from 'react';
import logo from '../assets/icon.png';
import '../styles/components/Banner.css';
import { Link, useLocation } from "react-router-dom";


const testFunction = () => {
    
    console.log("test");
}

const Banner = () => {

    const title = 'Groupomania';
        
    let getUsername = localStorage.getItem('username')
 
    return (
        <div className="gpm-banner">
            <h1><img src={logo} alt='Groupomania' className='gpm-logo' /></h1>
            <h1 className='gpm-title'>{title}</h1>
            <Link to ="../profil"><input id="inputName" className="profilbutton" type="button" value ={getUsername} onClick={testFunction}/><i class="fa-solid fa-user"></i></Link>
            
        </div>
    );

};
// {location.pathname === "/" &&
// <React.Fragment>
//     // <input id="inputName" className="profilbutton" type="button" value ={getUsername} onClick={testFunction}/>
// </React.Fragment>
// }
export default Banner;
