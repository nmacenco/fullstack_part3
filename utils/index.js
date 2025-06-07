/**
 * Generates a unique 16-digit ID using Math.random()
 * @returns {string} A 16-digit unique ID
 */
function generateId() {
  // Generate a large random number (16 digits)
  // Using Math.random() * 10^16 to get a number between 0 and 10^16
  // Then converting to string and padding with zeros if needed
  return (Math.random() * Math.pow(10, 16)).toString().padStart(16, "0");
}

module.exports = generateId;
