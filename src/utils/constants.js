export const screens = [
    { name: "Nautical Unit Conversion", route: "Converter" },
    { name: "ETA Calculator", route: "ETA Calculator" },
    { name: "Required Speed in Time", route: "Speed Calculator" },
    { name: "Anchor Dragging", route: "Anchor Dragging" },
    { name: "Fuel Cost Calculator", route: "Fuel Cost Calculator" },
];
export const categoryOptions = [
    "Temperature",
    "Speed",
    "Distance",
    "Length | Depth",
    "Weight",
    "Fuel | Volume",
    "Pressure",
    "Energy | Power"
];
export const fuelType = [
    "Heavy Fuel Oil",
    "Liquefied Natural Gas",
    "Marine Gas Oil",
    "Diesel"
]
export const fuelUnit = [
    "(MT/day)",
    "(kg/h)",
    "(L/h)"
]
export const densities = {
    "Heavy Fuel Oil": 0.98,
    "Marine Gas Oil": 0.86,
    "Liquefied Natural Gas": 0.72,
    "Diesel": 0.84
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