import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss'
import telegrom from '../assets/mensajes.png'

const Header = () => (
    <header className="header">
        <div className="header__el">
            <div className="header__el--img">
                <Link to='/login'>
                <img src={telegrom} />
                </Link>
                <h1>Telegrom</h1>
            </div>
            <div className="header__el--ses">
                <p>Cerrar Sesión</p>
            </div>
        </div>
    </header>
)

export default Header;