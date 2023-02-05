import React, { useState, useEffect } from 'react';
// Component Called via <DeliveryFeeCalculator /> 
export default function DeliveryFeeCalculator() {
    const [cartInput, setCartInput] = useState({ value: 0, distance: 0, quantity: 0, time: '' }); // Fee object. Initialised with values.

    // Input box values saved to object
    const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCartInput({ ...cartInput, [event.target.name]: event.target.value });
    }

    // ---The main function---
    const calculateFee = (index: any) => {
        let fee = 0;
        // ---Value calculation---
        if (cartInput.value < 10) {
            fee = fee + (10 - cartInput.value);
        }

        // ---Distance calculations---
        let noOf500mm = Math.ceil(cartInput.distance / 500); // Calculates the number of 500m, rounded up.
        fee = fee + 2; // minumum fee
        if (noOf500mm > 2) { // If distance is greater than 1000m
            fee = fee + ((1 * noOf500mm) - 2);
        }

        // ---Quantity calculations---
        let quantityFee = 0;
        if (cartInput.quantity >= 5) {
            for (let i = 0; i < (cartInput.quantity - 4); i++) {
                quantityFee = quantityFee + 0.5;
            }
        }
        if (cartInput.quantity > 12) {
            quantityFee = quantityFee + 1.2;
        }
        fee = fee + quantityFee;

        // ---Time calculations---
        let date = new Date(cartInput.time);
        let day = date.getDay(); // Assigns number to Mon-Fri, starting from Sun:0, Mon:1 ...
        let hour = date.getHours(); // Gets the hour

        if (day == 5) { // Establishes whether Friday or not
            console.log('Friday');
            if (hour >= 15 && hour <= 19) { // Establishes whether rush hour or not
                console.log('Rush hour');
                fee = fee * 1.2;
            }
        }

        // ---Cart final calculations---
        if (fee > 15) {
            fee = 15;
        }
        if (cartInput.value >= 100) {
            fee = 0;
        }
        document.getElementById("output")!.innerHTML = 'Delivery Fee: €' + fee.toFixed(2);
    }

    // Page output
    return (
        <>
            <div id="calculatorContainer">
                <div id="calculatorGrid">
                    <div id="header">
                    <h2>Delivery Fee Calculator</h2>
                    </div>
                    {/* The inputs */}
                    <div id="one">
                        <label htmlFor="cartValueInputBox">Cart Value:</label>
                    </div>
                    <div id="two">
                        <input type="number" onChange={inputChanged} id="value" placeholder="€" name="value" value={cartInput.value} />
                    </div>
                    <div id="three">
                        <label htmlFor="deliveryDistanceInputBox">Delivery Distance:</label>
                    </div>
                    <div id="four">
                        <input type="number" onChange={inputChanged} id="distance" placeholder="m" name="distance" value={cartInput.distance} />
                    </div>
                    <div id="five">
                        <label htmlFor="quantityInputBox">Quantity:</label>
                    </div>
                    <div id="six">
                        <input type="number" onChange={inputChanged} id="quantity" placeholder="Quantity" name="quantity" value={cartInput.quantity} />
                    </div>
                    <div id="seven">
                        <label htmlFor="time">Time:</label>
                    </div>
                    <div id="eight">
                        <input type="datetime-local" onChange={inputChanged} id="time" name="time" value={cartInput.time} />
                    </div>
                    {/* Calculate button */}
                    <div id="nine">
                        <button onClick={calculateFee} id="button">Calculate Delivery Fee</button>
                    </div>
                    {/* The output */}
                    <div id="ten">
                        <p id="output">Delivery Fee: €</p>
                    </div>
                </div>
            </div>
        </>
    );
}