import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";

function LocationInput({ updateMapLocation, isLoaded }) {
  const inputRef = useRef(null);
  const [address, setAddress] = useState("");

  const handleAddressChange = useCallback(
    (autocompleteInstance) => {
      const place = autocompleteInstance.getPlace();
      setAddress(place.formatted_address);
      const { lat, lng } = place.geometry.location;
      updateMapLocation({ lat: lat(), lng: lng() });
    },
    [updateMapLocation]
  );

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const autoCompleteInstance = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["geometry", "formatted_address"],
        componentRestrictions: { country: "CA" },
      }
    );

    autoCompleteInstance.addListener("place_changed", () =>
      handleAddressChange(autoCompleteInstance)
    );
  }, [handleAddressChange, isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  const handleFocus = () => {
    inputRef.current.select();
  };

  return (
    <input
      type="text"
      ref={inputRef}
      placeholder="Enter a location..."
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      onFocus={handleFocus}
    />
  );
}

export default LocationInput;

LocationInput.propTypes = {
  updateMapLocation: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};
