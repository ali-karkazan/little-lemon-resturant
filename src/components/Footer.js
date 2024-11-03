import React from 'react'
import logo from '../Asset/small_logo.png'

const Footer = () => {
    return (
        <footer>
            <section>
                <div className='company-info'>
                    <img src={logo} alt='Logo' />
                    <p>We are a family owned Mediterraneran resturant, focused
                        on traditional recipes served with a modern twist.</p>
                </div>
                <div>
                    <h3>Impotant Links</h3>
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/'>About</a></li>
                        <li><a href='.'>Menu</a></li>
                        <li><a href='.'>Reservatons</a></li>
                        <li><a href='.'>Order Online</a></li>
                        <li><a href='.'>Login</a></li>
                    </ul>
                </div>

                <div>
                    <h3>Contact</h3>
                    <ul>
                        <li>Address: <br /> 123 Towncity, USA</li>
                        <li>Phone: <br />+ 123 456 789</li>
                        <li>Email: <br />info@little-lemon.com</li>
                    </ul>
                </div>
            </section>
        </footer>
    );
};

export default Footer;