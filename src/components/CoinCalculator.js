import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CoinCalculator.css";

const CoinCalculator = () => {
  const [targetAmount, setTargetAmount] = useState("");
  const [denominations, setDenominations] = useState([]);
  const [selectedDenominations, setSelectedDenominations] = useState([]);
  const [result, setResult] = useState({ coins: null, message: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch denominations from the backend when the component loads
  useEffect(() => {
    const fetchDenominations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/coins/`);
        setDenominations(response.data);
      } catch (err) {
        console.error("Error fetching denominations:", err);
        setError("Failed to load denominations. Please try again later.");
      }
    };

    fetchDenominations();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult({ coins: null, message: null });
    setError(null);

    if (!targetAmount || selectedDenominations.length === 0) {
      setError("Please enter a target amount and select at least one denomination.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/coins/calculate`, {
        targetAmount: parseFloat(targetAmount),
        coinDenominations: selectedDenominations,
      });

      // Handle cases where coins are null but a message is provided
      if (response.data.coins === null && response.data.message) {
        setResult(response.data);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      console.error("Error calculating coins:", err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (denomination) => {
    if (selectedDenominations.includes(denomination)) {
      setSelectedDenominations(selectedDenominations.filter((item) => item !== denomination));
    } else {
      setSelectedDenominations([...selectedDenominations, denomination]);
    }
  };

  return (
    <div className="calculator-container">
      <h1>Coin Calculator</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="calculator-form">
        <label className="form-label">
          Target Amount:
          <input
            type="number"
            step="0.01"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            className="input-field"
          />
        </label>

        <div className="checkbox-group">
          <h3>Select Coin Denominations</h3>
          {denominations.length > 0 ? (
            <div className="checkbox-grid">
              {denominations.map((denomination) => (
                <div key={denomination} className="checkbox-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      value={denomination}
                      onChange={() => handleCheckboxChange(denomination)}
                      checked={selectedDenominations.includes(denomination)}
                      className="checkbox-input"
                    />
                    {denomination}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading denominations...</p>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </form>

      <div className="result-container">
        <h3>Calculation Result</h3>
        {result.message && <p>{result.message}</p>}
        {result.coins && result.coins.length > 0 ? (
          <div>
            <h4>Coins:</h4>
            <ul>
              {result.coins.map((coin, index) => (
                <li key={index}>{coin}</li>
              ))}
            </ul>
          </div>
        ) : (
          !result.coins && result.message && (
            <p>No coins in the result. Check the message for more details.</p>
          )
        )}
      </div>
    </div>
  );
};

export default CoinCalculator;
