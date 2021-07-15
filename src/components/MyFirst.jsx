import React, { useState } from 'react';
import '../assets/styles/App.scss'
const MyFirst = (props) => {
    const [count, setCount] = useState(0)
    return (
        <button onClick={() => {setCount(count+1)}}>Clickeado {count} veces</button>
    )
}

export default MyFirst;