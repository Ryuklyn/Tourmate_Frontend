
export const displayName = (enumValue) => {
    return enumValue
      .toLowerCase() // lowercase
      .split("_")   // split by underscore
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter
      .join(" ");   // join with space
  };
  
  // Convert readable string back to ENUM format
  export const toEnum = (displayValue) => {
    return displayValue.toUpperCase().replace(/ /g, "_");
  };
  