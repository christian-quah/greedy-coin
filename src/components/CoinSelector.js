import React, { useState, useEffect } from "react";
import axios from "axios";

const CoinSelector = ({ selectedDenominations, setSelectedDenominations }) => {
  const [denominations, setDenominations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the denominations from the backend
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/coins/`)
      .then((response) => {
        setDenominations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching denominations:", error);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (denomination) => {
    if (selectedDenominations.includes(denomination)) {
      setSelectedDenominations(
        selectedDenominations.filter((item) => item !== denomination)
      );
    } else {
      setSelectedDenominations([...selectedDenominations, denomination]);
    }
  };

  if (loading) {
    return <div>Loading denominations...</div>;
  }

  return (
    <div>
      <h3>Select Coin Denominations</h3>
      {denominations.map((denomination) => (
        <div key={denomination}>
          <label>
            <input
              type="checkbox"
              value={denomination}
              onChange={() => handleCheckboxChange(denomination)}
              checked={selectedDenominations.includes(denomination)}
            />
            {denomination}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CoinSelector;
