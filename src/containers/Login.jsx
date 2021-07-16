import React from 'react';
import Header from '../components/Header'
import '../assets/styles/Login.scss'

const Login = () => (
    <>
    <Header />
    <section className="login">
        <section className="login__container">
           <h3>Iniciar sesión</h3>
           <form className="login__container--form">
               <input type="text" placeholder="Correo" className="login__container--in" />
               <input type="password" placeholder="Contraseña" className="login__container--in" />
               <button type="button">Iniciar Sesión</button>

               <div className="login__container--remember">
                <label>
                    <input type="checkbox" id="cbox1" value="" /> Recuerdame</label>
               <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
           </form> 
        </section>
    </section>
    </>
)

export default Login;