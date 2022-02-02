import logo from '../assets/icon.png';
import '../styles/Banner.css';
import { Link } from "react-router-dom";


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

            <nav>
                <Link to="/">Posts</Link> |{" "}
                <Link to="signup">Sign Up</Link>
                <Link to="login">Login</Link>
            </nav>
        </div>
    );

};

export default Banner;
