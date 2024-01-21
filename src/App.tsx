import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<string>("");

  const calculateDeliveryFee = () => {
    let deliveryFee = 0;

    // Rule 1: Add surcharge for small orders
    if (cartValue < 10) {
      deliveryFee += 10 - cartValue;
    }

    // Rule 2: Calculate distance-based fee
    if (deliveryDistance > 1000) {
      deliveryFee += 2 + Math.ceil((deliveryDistance - 1000) / 500);
    } else {
      deliveryFee += 2;
    }

    // Additional rules can be implemented similarly

    return deliveryFee;
  };

  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  return (
    <div className="App">
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
      <div>Calculated Delivery Fee: {deliveryFee}€</div>
      <button onClick={() => setDeliveryFee(calculateDeliveryFee())}>
        Calculate Delivery Fee
      </button>
    </div>
  );
};

export default App;
