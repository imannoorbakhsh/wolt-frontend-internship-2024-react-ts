import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<string>('');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <input
          type="number"
          value={cartValue}
          onChange={(e) => setCartValue(Number(e.target.value))}
          placeholder="Cart Value"
        />
        <input
          type="number"
          value={deliveryDistance}
          onChange={(e) => setDeliveryDistance(Number(e.target.value))}
          placeholder="Delivery Distance (in meters)"
        />
        <input
          type="number"
          value={numberOfItems}
          onChange={(e) => setNumberOfItems(Number(e.target.value))}
          placeholder="Number of Items"
        />
        <input
          type="text"
          value={orderTime}
          onChange={(e) => setOrderTime(e.target.value)}
          placeholder="Order Time (as text for now)"
        />
      </div>
    </div>
  );
}

export default App;
