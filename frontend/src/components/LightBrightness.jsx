import { useState, useRef } from "react";

function LightBrightness() {
  const [value, setValue] = useState(0);
  const timeoutRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      sendData(event.target.value);
    }, 1000);
  };

  const sendData = (value) => {
    console.log(`Sending data: ${value}`);
  };

  return (
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={handleChange}
    />
  );
}

export default LightBrightness;
