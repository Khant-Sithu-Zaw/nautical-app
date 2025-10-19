export const formatNumber = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";

    if (Math.abs(num) >= 1e6 || (Math.abs(num) > 0 && Math.abs(num) < 1e-2)) {
        return num.toExponential(2);
    }

    return num.toFixed(2);
};
export const handleNumberChange = (text, fieldName = "Value") => {
    // Allow only numbers
    let cleaned = text.replace(/[^0-9]/g, "");

    // Prevent leading zeros like "000123"
    if (cleaned.length > 1 && cleaned.startsWith("0")) {
        cleaned = cleaned.replace(/^0+/, "");
    }

    // Convert to number for validation
    const num = Number(cleaned);

    if (num <= 0 && cleaned !== "") {
        alert(`${fieldName} must be greater than 0.`);
        return ""; // return empty if invalid
    }

    return cleaned; // return the valid cleaned value
};
export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};