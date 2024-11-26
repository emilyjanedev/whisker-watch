const getCityFromAddress = (address) => {
  const addressSections = address.split(",").map((section) => section.trim());
  const city = addressSections[1];
  return city;
};

export { getCityFromAddress };
