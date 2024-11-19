import React from "react";

function LocationSearch({ updateMapLocation }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // updateMapLocation();
    console.log("Submitted!");
  };
  return (
    <form action="submit" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter a location..." />
    </form>
  );
}

export default LocationSearch;
