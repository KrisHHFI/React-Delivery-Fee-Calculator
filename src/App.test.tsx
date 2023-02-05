//import React from 'react';
import App from './App';
import DeliveryFeeCalculator from './components/calculator';
import { render, screen, fireEvent } from'@testing-library/react'

// TEST 1
test('Tests whether default fee is €12.00', () => {
  
  render(<App />);
  render(<DeliveryFeeCalculator />);
  
  const button = screen.getByText('Calculate Delivery Fee');

  fireEvent.click(button);
  const output = screen.getByText(/Delivery Fee: €12.00/i); 
  expect(output).toBeInTheDocument();
});