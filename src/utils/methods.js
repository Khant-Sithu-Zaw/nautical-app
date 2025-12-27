export const formatNumber = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";

    if (Math.abs(num) >= 1e6 || (Math.abs(num) > 0 && Math.abs(num) < 1e-2)) {
        return num.toExponential(3);
    }

    return num.toFixed(3);
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
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|jp|mm)$/i;
    return emailRegex.test(email);
};

export const formatShortDate = (dateStr) => {
    if (!dateStr) return "";

    // Try to parse "September 22, 2025" manually
    const date = new Date(dateStr);
    if (isNaN(date)) {
        // fallback: split manually if format is "Month DD, YYYY"
        const parts = dateStr.replace(",", "").split(" "); // ["September", "22", "2025"]
        if (parts.length === 3) {
            const monthNames = {
                January: "01", February: "02", March: "03", April: "04",
                May: "05", June: "06", July: "07", August: "08",
                September: "09", October: "10", November: "11", December: "12"
            };
            const day = parts[1].padStart(2, "0");
            const month = monthNames[parts[0]] || "01";
            const year = parts[2];
            return `${day}.${month}.${year}`;
        }
        return dateStr; // fallback: return as-is
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

