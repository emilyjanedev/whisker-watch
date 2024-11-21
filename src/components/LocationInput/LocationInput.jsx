import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

function LocationInput({ callbackFn, name = "" }) {
  const inputRef = useRef(null);
  const placesLib = useMapsLibrary("places");
  const [address, setAddress] = useState("");

  const handleAddressChange = useCallback(
    (autocompleteInstance) => {
      const place = autocompleteInstance.getPlace();
      setAddress(place.formatted_address);
      const { lat, lng } = place.geometry.location;
      callbackFn({ lat: lat(), lng: lng() });
    },
    [callbackFn]
  );

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

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
  }, [handleAddressChange, placesLib]);

  const handleFocus = () => {
    inputRef.current.select();
  };

  return (
    <input
      type="text"
      name={name}
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
  callbackFn: PropTypes.func.isRequired,
  name: PropTypes.string,
};
