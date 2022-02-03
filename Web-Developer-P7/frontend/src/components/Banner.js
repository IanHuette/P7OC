import logo from '../assets/icon.png';
import '../styles/Banner.css';


const testFunction = () => {
    console.log("test");
}

const Banner = () => {

    const title = 'Groupomania';

    return (
        <div className="gpm-banner">
            <h1><img src={logo} alt='Groupomania' className='gpm-logo' /></h1>
            <h1 className='gpm-title'>{title}</h1>
            <input className="profilbutton" type="button" value ="username" onClick={testFunction}/>
        </div>
    );

};

export default Banner;
