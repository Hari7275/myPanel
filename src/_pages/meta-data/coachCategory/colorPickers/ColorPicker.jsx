import React, { useState, useEffect } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import "./colorpicker.css";

const rgbaToHex = (rgba) => {
  const [r, g, b, a] = rgba
    .replace(/^rgba?\(/, "")
    .replace(/\)$/, "")
    .split(",")
    .map(Number);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${Math.round(a * 255)
    .toString(16)
    .padStart(2, "0")}`;
};

const hexToRgba = (hex) => {
  const hexValue = hex.replace(/^#/, "");
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);
  const a =
    hexValue.length === 8
      ? (parseInt(hexValue.substring(6, 8), 16) / 255).toFixed(2)
      : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const ColorPickers = () => {
  const [color1, setColor1] = useState("rgba(173, 17, 17, 1)");
  const [color2, setColor2] = useState("rgba(172, 17, 17, 1)");
  const [gradientData, setGradientData] = useState([
    { offset: 0, color: color1 },
    { offset: 1, color: color2 },
  ]);

  useEffect(() => {
    // Update gradientData when color1 or color2 changes
    setGradientData([
      { offset: 0, color: color1 },
      { offset: 1, color: color2 },
    ]);
  }, [color1, color2]);

  const handleColor1Change = (newColor) => {
    setColor1(hexToRgba(newColor));
  };

  const handleColor2Change = (newColor) => {
    setColor2(hexToRgba(newColor));
  };
  const handleChange = (e) => {
    try {
      const data = JSON.parse(e.target.value);
      if (Array.isArray(data)) {
        setGradientData(data);
        // Update color1 and color2 based on gradientData
        const color1Data =
          data.find((item) => item.offset === 0)?.color || color1;
        const color2Data =
          data.find((item) => item.offset === 1)?.color || color2;
        setColor1(color1Data);
        setColor2(color2Data);
      }
    } catch (error) {
      // Handle invalid JSON input
      console.error("Invalid JSON", error);
    }
  };

  return (
    <div className="gradient-container">
      <div className="color-pickers">
        <div>
          <HexAlphaColorPicker
            color={rgbaToHex(color1)}
            onChange={handleColor1Change}
            className="colorPicker"
            style={{ height: "150px", width: "250px" }}
          />
          <p>Color 1</p>
        </div>
        <div>
          <HexAlphaColorPicker
            color={rgbaToHex(color2)}
            onChange={handleColor2Change}
            className="colorPicker"
            style={{ height: "150px", width: "250px" }}
          />
          <p>Color 2</p>
        </div>
      </div>

      <div
        className="gradient-display"
        style={{
          height: "200px",
          width: "200px",
          borderRadius: "50%",
          background: `linear-gradient(to right, ${color1}, ${color2})`,
        }}
      ></div>

      <div>
        <p>Gradient Data:</p>
        {/* <textarea
          style={{ width: "80%", height: "50px", rows: "4" }}
          value={JSON.stringify(gradientData, null, 2)}
          onChange={handleChange}
        /> */}
        <pre style={{ fontSize: "20px" }}>{JSON.stringify(gradientData)}</pre>
      </div>
    </div>
  );
};

export default ColorPickers;
