export const screens = [
    { name: "Unit\nConversion", route: "Converter", image: require("../../assets/images/Converter.png"), },
    { name: "ETA\nCalculator", route: "ETA Calculator", image: require("../../assets/images/Eta.png") },
    { name: "Required\nSpeed", route: "Speed Calculator", image: require("../../assets/images/Speed.png") },
    { name: "Anchor\nDragging", route: "Anchor Dragging", image: require("../../assets/images/Drag.png") },
    { name: "Fuel\nCalculation", route: "Fuel Cost Calculator", image: require("../../assets/images/Fuel.png") },
    // { name: "TimeZone\nCalculator", route: "TimeZone Calculator", image: require("../../assets/images/Time.png"), },
];
export const categoryOptions = [
    { name: "Temperature Converter", image: require("../../assets/images/temperature.png") },
    { name: "Speed Converter", image: require("../../assets/images/speedIcon.png") },
    { name: "Distance Converter", image: require("../../assets/images/distanceIcon.png") },
    { name: "Length Converter", image: require("../../assets/images/depthIcon.png") },
    { name: "Weight Converter", image: require("../../assets/images/weightIcon.png") },
    { name: "Volume Converter", image: require("../../assets/images/volumeIcon.png") },
    { name: "Pressure Converter", image: require("../../assets/images/pressureIcon.png") },
    { name: "Energy Converter", image: require("../../assets/images/energyIcon.png") },
];

export const fuelUnit = [
    "(MT/day)",
    "(kg/h)",
]

export const shackleLengthOptions = [
    "15 meters",
    "20 meters",
    "25 meters",
    "27.5 meters",
    "30 meters"
];
export const countOptions = [
    "4 shackles",
    "5 shackles",
    "6 shackles",
    "7 shackles",
    "8 shackles",
    "9 shackles",
    "10 shackles",
    "11 shackles",
    "12 shackles",
    "13 shackles",
    "14 shackles",
    "15 shackles",
    "16 shackles",
];
export const signNumberRegex = /^-?\d*\.?\d*$/;
export const numberRegex = /^\d*\.?\d*$/;
export const safetyTips = [
    // ⚙️ General Safety
    "Always wear appropriate PPE (Personal Protective Equipment) before starting any job.",
    "Never work alone in confined spaces — follow the enclosed space entry permit procedure.",
    "Keep emergency exits and passageways clear at all times.",
    "Know the location of fire extinguishers and how to use them properly.",
    "Report all unsafe conditions or near-misses immediately to your superior.",
    "Keep your tools in good condition and return them after use.",
    "Always follow the company’s Safety Management System (SMS) guidelines.",

    // ⚡ Electrical & Machinery
    "Before working on electrical systems, isolate and tag out the power source.",
    "Never bypass safety devices or interlocks on machinery.",
    "Check oil and fuel leaks regularly — small leaks can lead to fire hazards.",
    "Avoid wearing loose clothing while operating rotating machinery.",
    "Ventilate the engine room properly before starting work.",

    // 🪜 Deck & Mooring Safety
    " Keep clear of snap-back zones when handling mooring lines.",
    "Always use proper hand signals and communication during mooring operations.",
    "Wear gloves and safety shoes when handling ropes or wires.",
    "Never stand in the bight of a line under tension.",
    "Keep decks clean and dry — slips cause many injuries on board.",

    // 🔥 Fire Safety
    "Conduct fire drills seriously — they prepare you for real emergencies.",
    "Check fire doors and dampers regularly to ensure they close properly.",
    "Know your fire station and assigned duties during fire drills.",
    "Never block fire extinguishers, hydrants, or emergency equipment.",

    // 🧭 Navigation & Bridge
    "Maintain a proper lookout — collision risk increases when you lose focus.",
    "Verify radar and AIS settings before every watch.",
    "Do not leave the bridge unattended — call the Master if in doubt.",
    "Communicate clearly with the engine room before maneuvering.",

    // ⚓ Engine Room Safety
    "Keep engine room clean and free from oil residues.",
    "Avoid using rags soaked with oil near hot surfaces.",
    "Test bilge alarms and emergency stops regularly.",
    "Always close the fuel oil quick closing valves when required.",
    "Wear ear protection — engine rooms are high noise zones.",

    // 🌊 Personal & Weather Safety
    "Always use lifelines and safety harnesses when working on deck in bad weather.",
    "Secure loose items before rough weather or heavy rolling.",
    "Never go outside the accommodation without proper clothing in cold weather.",
    "Avoid leaning over the ship’s side — use safety belts when necessary.",

    // 🧠 Mental & Team Safety
    "Speak up if you’re unsure — assumptions cause accidents.",
    "Watch out for your crewmates; safety is teamwork.",
    "Rest well — fatigue impairs judgment and reaction time.",
    "Report injuries immediately, no matter how small.",
    "Stay alert — your family is waiting for you to return home safely."
];
