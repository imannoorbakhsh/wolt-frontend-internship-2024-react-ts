import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const calculateDeliveryFee = () => {
    // Reset error message
    setErrorMessage("");

    // Validate inputs
    if (cartValue < 0 || deliveryDistance < 0 || numberOfItems < 0) {
      setErrorMessage(
        "Please enter valid values. Negative numbers are not allowed."
      );
      return;
    }

    let fee = 0; // Fee in euros

    // Rule 1: Small order surcharge
    if (cartValue < 10) {
      fee += 10 - cartValue; // Directly in euros
    }

    // Rule 2: Calculate distance-based fee
    fee += 2; // Base fee for the first 1000 meters
    if (deliveryDistance > 1000) {
      fee += Math.ceil((deliveryDistance - 1000) / 500); // 1€ for every additional 500 meters or part thereof
    }

    // Rule 3: Additional 50 cent surcharge for each item above 4
    if (numberOfItems >= 5) {
      fee += (numberOfItems - 4) * 0.5; // 50 cents per additional item
    }

    // Rule 4: Bulk fee for more than 12 items
    if (numberOfItems > 12) {
      fee += 1.2; // 1.20€ bulk fee
    }

    // Rule 6: Free delivery for cart value equal or more than 200€
    if (cartValue >= 200) {
      fee = 0;
    } else {
      // Apply rush hour pricing based on browser's local time
      if (orderTime) {
        const localOrderDate = new Date(orderTime);
        if (!isNaN(localOrderDate.getTime())) {
          // Log for debugging
          console.log("Local Order Time:", localOrderDate);

          // Rush hour is 3 - 7 PM local time on Fridays
          if (
            localOrderDate.getDay() === 5 && // Check if it's Friday
            localOrderDate.getHours() >= 15 && // Check if it's after 3 PM local time
            localOrderDate.getHours() < 19
          ) {
            // Check if it's before 7 PM local time
            console.log("Applying rush hour pricing");
            fee *= 1.2; // Rush hour pricing
          } else {
            console.log("Not applying rush hour pricing");
          }
        }
      }
      // Rule 5: The delivery fee can never be more than 15€
      fee = Math.min(fee, 15);
    }

    // Update the state with the calculated fee
    setDeliveryFee(parseFloat(fee.toFixed(2))); // Round to two decimal places for final fee
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Delivery Fee Calculator</h1>
      </header>
      <div className="App-content">
        <label>
          Cart Value (€)
          <input
            type="number"
            value={cartValue}
            onChange={(e) => setCartValue(parseFloat(e.target.value))}
            step="0.01" // Allows inputting decimal values
            data-test-id="cartValue"
          />
        </label>

        <label>
          Delivery Distance (m)
          <input
            type="number"
            value={deliveryDistance}
            onChange={(e) => setDeliveryDistance(Number(e.target.value))}
            data-test-id="deliveryDistance"
          />
        </label>
        <label>
          Number of Items
          <input
            type="number"
            value={numberOfItems}
            onChange={(e) => setNumberOfItems(Number(e.target.value))}
            data-test-id="numberOfItems"
          />
        </label>
        <label>
          Order Time
          <input
            type="datetime-local"
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
            data-test-id="orderTime"
          />
        </label>
        <button onClick={calculateDeliveryFee} data-test-id="calculateButton">
          Calculate Delivery Fee
        </button>
        {deliveryFee !== null && (
          <p data-test-id="fee">Delivery price: {deliveryFee}€</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <footer className="App-footer">Delivery Fee Calculation</footer>
    </div>
  );
};

export default App;
