import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  // State for storing form values
  const [cartValue, setCartValue] = useState<string>("");
  const [deliveryDistance, setDeliveryDistance] = useState<string>("");
  const [numberOfItems, setNumberOfItems] = useState<string>("");
  const [orderTime, setOrderTime] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [touched, setTouched] = useState({
    cartValueTouched: false,
    deliveryDistanceTouched: false,
    numberOfItemsTouched: false,
  });

  // Function to handle input changes
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setTouched({ ...touched, [field]: true });
    };

  const allFieldsFilled = () => {
    return cartValue && deliveryDistance && numberOfItems;
  };

  const inputStyle = (fieldTouched: boolean, fieldValue: string) => {
    return fieldTouched && !fieldValue ? { border: "1px solid red" } : {};
  };
  const calculateDeliveryFee = () => {
    // reset error message
    setErrorMessage("");

    const numCartValue = parseFloat(cartValue || "0");
    const numDeliveryDistance = parseFloat(deliveryDistance || "0");
    const numNumberOfItems = parseInt(numberOfItems || "0", 10);
    // checking for negative values
    if (numCartValue < 0 || numDeliveryDistance < 0 || numNumberOfItems < 0) {
      setErrorMessage(
        "Please enter valid values. Negative numbers are not allowed."
      );
      return;
    }

    let fee = 0; // Fee in euro

    // Rule 1: Small order surcharge
    if (numCartValue < 10) {
      fee += 10 - numCartValue;
    }

    // Rule 2: Calculate distance-based fee
    fee += 2; // Base fee for the first 1000 meters.
    if (numDeliveryDistance > 1000) {
      fee += Math.ceil((numDeliveryDistance - 1000) / 500); // 1€ for every additional 500 meters
    }

    // Rule 3: Additional 50 cent surcharge for each item above 4
    if (numNumberOfItems >= 5) {
      fee += (numNumberOfItems - 4) * 0.5; // 50 cents per additional item
    }

    // Rule 4: Bulk fee for more than 12 items
    if (numNumberOfItems > 12) {
      fee += 1.2;
    }

    // Rule 6: Free delivery for cart value equal or more than 200€
    if (numCartValue >= 200) {
      fee = 0;
    } else {
      // Apply rush hour pricing based on browser's local time
      if (orderTime) {
        const localOrderDate = new Date(orderTime);
        if (!isNaN(localOrderDate.getTime())) {
          // debugging local time on console. there is an error
          console.log("Local Order Time:", localOrderDate);

          // Rush hour is 3 - 7 PM local time on Fridays
          if (
            localOrderDate.getDay() === 5 && // Check if it's Friday
            localOrderDate.getHours() >= 15 && // Check if it's after 3 PM local time
            localOrderDate.getHours() < 19
          ) {
            // Check if it's before 7 PM
            console.log("rush hour pricing applied");
            fee *= 1.2; // Rush hour pricing
          } else {
            console.log("rush hour pricing not applied!");
          }
        }
      }
      // Rule 5: The delivery fee can never be more than 15€
      fee = Math.min(fee, 15);
    }

    // Update the state with the calculated fee
    setDeliveryFee(parseFloat(fee.toFixed(2)));
  };

  return (
    <div className="App">
      <div className="background-image-container">
        <div className="overlay-container">
          <div className="left-container"></div>
          <div className="right-container">
            <div className="form-container">
              {/* Cart Value Field */}
              <div className="form-field">
                <label htmlFor="cartValue">Cart Value (€)</label>
                <input
                  id="cartValue"
                  type="number"
                  value={cartValue}
                  placeholder="Enter cart value"
                  onChange={handleInputChange(setCartValue, "cartValueTouched")}
                  onBlur={() =>
                    setTouched({ ...touched, cartValueTouched: true })
                  }
                  style={inputStyle(touched.cartValueTouched, cartValue)}
                  step="0.01"
                  data-test-id="cartValue"
                />
              </div>

              {/* Delivery Distance Field */}
              <div className="form-field">
                <label htmlFor="deliveryDistance">Delivery Distance (m)</label>
                <input
                  id="deliveryDistance"
                  type="number"
                  value={deliveryDistance}
                  placeholder="Enter delivery distance"
                  onChange={handleInputChange(
                    setDeliveryDistance,
                    "deliveryDistanceTouched"
                  )}
                  onBlur={() =>
                    setTouched({ ...touched, deliveryDistanceTouched: true })
                  }
                  style={inputStyle(
                    touched.deliveryDistanceTouched,
                    deliveryDistance
                  )}
                  data-test-id="deliveryDistance"
                />
              </div>

              {/* Number of Items Field */}
              <div className="form-field">
                <label htmlFor="numberOfItems">Number of Items</label>
                <input
                  id="numberOfItems"
                  type="number"
                  value={numberOfItems}
                  placeholder="Enter number of items"
                  onChange={handleInputChange(
                    setNumberOfItems,
                    "numberOfItemsTouched"
                  )}
                  onBlur={() =>
                    setTouched({ ...touched, numberOfItemsTouched: true })
                  }
                  style={inputStyle(
                    touched.numberOfItemsTouched,
                    numberOfItems
                  )}
                  data-test-id="numberOfItems"
                />
              </div>

              {/* Order Time Field */}
              <div className="form-field">
                <label htmlFor="orderTime">Order Time</label>
                <input
                  id="orderTime"
                  type="datetime-local"
                  value={orderTime}
                  onChange={(e) => setOrderTime(e.target.value)}
                  data-test-id="orderTime"
                />
              </div>

              {/* Calculate Delivery Fee Button */}
              <button
                onClick={calculateDeliveryFee}
                className="submit-button"
                data-test-id="calculateButton"
                disabled={!allFieldsFilled()}
              >
                Calculate Delivery Fee
              </button>

              {/* Delivery Fee Display */}
              {/* Delivery Fee Display */}
              <p data-test-id="fee">
                Delivery price:{" "}
                <span className="fee-value">{deliveryFee.toFixed(2)}€</span>
              </p>
              {/* Error Message Display */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
