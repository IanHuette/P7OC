import React from 'react';
import logo from '../assets/icon.png';
import '../styles/components/Banner.css';


const testFunction = () => {
    console.log("test");
}

const Banner = () => {

    const title = 'Groupomania';
        
    let getUsername = sessionStorage.getItem('username')
 
    return (
        <div className="gpm-banner">
            <h1><img src={logo} alt='Groupomania' className='gpm-logo' /></h1>
            <h1 className='gpm-title'>{title}</h1>
            <input id="inputName" className="profilbutton" type="button" value ={getUsername} onClick={testFunction}/>
        </div>
    );

};
// {location.pathname === "/" &&
// <React.Fragment>
//     // <input id="inputName" className="profilbutton" type="button" value ={getUsername} onClick={testFunction}/>
// </React.Fragment>
// }
export default Banner;
