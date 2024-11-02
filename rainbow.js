// colorUtils.js

let lastColor = null; // Variable to store the last color

// Function to generate a random color
export function getRandomColor(crazy) {
  let color;

  // Generate a non-red color
  do {
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } while (isRed(color));

  // If lastColor is set, slightly alter the current color
  if (lastColor) {
    color = slightlyAlterColor(lastColor, crazy);
  }

  lastColor = color; // Save the current color for the next iteration
  return color;
}

// Function to check if the color is red
function isRed(color) {
  const rgb = hexToRgb(color);
  return rgb.r >= 200 && rgb.g < 100 && rgb.b < 100; // Rough red detection
}

// Function to convert hex color to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

// Function to slightly alter the last color
function slightlyAlterColor(color, variation) {
  const rgb = hexToRgb(color);
  
  // Slightly adjust RGB values
  const newColor = {
    r: Math.min(Math.max(rgb.r + getRandomVariation(variation), 0), 255),
    g: Math.min(Math.max(rgb.g + getRandomVariation(variation), 0), 255),
    b: Math.min(Math.max(rgb.b + getRandomVariation(variation), 0), 255)
  };

  return rgbToHex(newColor.r, newColor.g, newColor.b);
}

// Function to get a random variation
function getRandomVariation(variation) {
  return Math.floor(Math.random() * (variation * 2 + 1)) - variation; // Variation between -variation and +variation
}

// Function to convert RGB to hex
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Function to color the cell
function colorCell(cell) {
  const color = getRandomColor();
  cell.style.background = color;
  console.log(`Cell colored: ${color}`);
}
