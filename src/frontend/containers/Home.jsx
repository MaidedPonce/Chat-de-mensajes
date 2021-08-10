import React, { useState } from 'react';
import Header from '../components/Header';
import Message from '../components/Message';
import '../assets/styles/Home.scss';

const Home = () => {

    const [show, setShow] = useState(false);
    
    return (
        <>
            <Header />
            <section className="area">
                <section className="area__sub">
                    <div>
                        <p>Chat con Juanita</p>
                    </div>
                </section>
            </section>
            <section className="botton">
                <div className="botton__container">
                    <button onClick={() => setShow(!show)} className="botton__container--btn">+</button>
                </div>
                {
                    show ? <Message /> : ''
                }
            </section>
        </>
    )
}

export default Home;