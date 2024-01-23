import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<string>('');
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const calculateDeliveryFee = () => {
    // Reset error message
    setErrorMessage('');

    // Validate inputs
    if (cartValue < 0 || deliveryDistance < 0 || numberOfItems < 0) {
      setErrorMessage('Please enter valid values. Negative numbers are not allowed.');
      return;
    }

    let fee = 0;

    // Calculation logic here
    // ...

    setDeliveryFee(fee);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Your existing content or add a title for your header */}
        <h1>Delivery Fee Calculator</h1>
      </header>
      <header className="App-header">
        {/* Your existing header content */}
      </header>
      <div className="App-content">
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
        <button onClick={calculateDeliveryFee}>
          Calculate Delivery Fee
        </button>
        {deliveryFee !== null && <p>Calculated Delivery Fee: {deliveryFee}€</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <footer className="App-footer">
        <p>Delivery Fee Calculation</p>
      </footer>
    </div>
  );
};

export default App;
