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
    "Volume",
    "Pressure",
    "Energy | Power",
];

export const fuelUnit = [
    "(MT/day)",
    "(kg/h)",
]

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