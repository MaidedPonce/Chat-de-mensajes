import React, { useState } from 'react';
import '../styles/App.scss';

const MyFirst = () => {
  const [count, setCount] = useState(0);
  return (
    <button type='button' onClick={() => { setCount(count + 1); }}>
      Clickeado
      {count}
      {' '}
      veces
    </button>
  );
};

export default MyFirst;
