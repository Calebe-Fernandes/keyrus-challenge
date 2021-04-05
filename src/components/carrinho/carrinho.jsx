import React, { useState, useEffect } from 'react'




export default function Carrinho(props) {

    const [count, setCount] = useState(0);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };
    return (
        <div>
            <div>
                <button onClick={handleDecrement}>-</button>
                <h5>Count is {count}</h5>
                <button onClick={handleIncrement}>+</button>
            </div>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    )
  }


