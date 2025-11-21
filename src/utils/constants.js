export const screens = [
    { name: "Unit\nConversion", route: "Converter", image: require("../../assets/images/Converter.png"), },
    { name: "ETA\nCalculator", route: "Estimated Time of Arrival", image: require("../../assets/images/Eta.png") },
    { name: "STW\nCalculator", route: "Required STW to Travel", image: require("../../assets/images/Speed.png") },
    { name: "Anchor\nDragging", route: "Turning Circle Method", image: require("../../assets/images/Drag.png") },
    { name: "Fuel\nEstimator", route: "Fuel Cost Estimation", image: require("../../assets/images/Fuel.png") },
    // { name: "TimeZone\nCalculator", route: "TimeZone Calculator", image: require("../../assets/images/Time.png"), },
];

export const categoryOptions = [
    { name: "Temperature Converter", image: require("../../assets/images/temperature.png"), displayName: "Temperature\nConverter" },
    { name: "Speed Converter", image: require("../../assets/images/speedIcon.png"), displayName: "Speed\nConverter" },
    { name: "Distance Converter", image: require("../../assets/images/distanceIcon.png"), displayName: "Distance\nConverter" },
    { name: "Length Converter", image: require("../../assets/images/depthIcon.png"), displayName: "Length\nConverter" },
    { name: "Weight Converter", image: require("../../assets/images/weightIcon.png"), displayName: "Weight\nConverter" },
    { name: "Volume Converter", image: require("../../assets/images/volumeIcon.png"), displayName: "Volume\nConverter" },
    { name: "Pressure Converter", image: require("../../assets/images/pressureIcon.png"), displayName: "Pressure\nConverter" },
    { name: "Energy Converter", image: require("../../assets/images/energyIcon.png"), displayName: "Energy\nConverter" },
];
export const levels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert"
];
export const weatherOptions = [
    { label: "Calm", loss: 0 },
    { label: "Light breeze", loss: 2 },
    { label: "Moderate breeze", loss: 5 },
    { label: "Fresh breeze", loss: 7 },
    { label: "Strong breeze", loss: 10 },
    { label: "Near gale", loss: 12 },
    { label: "Gale", loss: 15 },
    { label: "Severe gale", loss: 18 },
    { label: "Storm", loss: 20 },
    { label: "Violent storm", loss: 25 },
];
export const fuelUnit = [
    "(MetricTon/day)",
    "(Kilogram/hour)",
    "(Litre/hour)"
]
export const ranks = [
    "Captain (Master)",
    "Chief Officer (CO)",
    "Second Officer (2O)",
    "Third Officer (3O)",
    "Chief Engineer (CE)",
    "First Engineer (1E)",
    "Second Engineer (2E)",
    "Third Engineer (3E)",
    "Fourth Engineer (4E)",
    "Electrical Officer (ETO)",
    "Bosun (BSN)",
    "Fitter (FTR)",
    "Able Seaman (AB)",
    "Ordinary Seaman (OS)",
    "Pumpman (PUM)",
    "Wiper (WPR)",
    "Oiler (OIL)",
    "Electrical Rating (ETR)",
    "Chief Cook (CK)",
    "Deck Cadet (DC)",
    "Engine Cadet (EC)",
    "Deck Rating (DR)",
    "Engine Rating (ER)",
    "Steward (SD)",
    "MessMan (MM)"
];
export const shackleLengthOptions = [
    "15 meters",
    "20 meters",
    "25 meters",
    "27.5 meters",
    "30 meters"
];
export const countOptions = [
    "3 shackles",
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
    "Always follow the company’s Safety Management System (SMS) guidelines.",

    // ⚡ Electrical & Machinery
    "Before working on electrical systems, isolate and tag out the power source.",
    "Check oil and fuel leaks regularly — small leaks can lead to fire hazards.",
    "Ventilate the engine room properly before starting work.",

    // 🪜 Deck & Mooring Safety
    "Keep clear of snap-back zones when handling mooring lines — one step can save your life.",
    "Always use proper hand signals and clear communication during mooring operations.",
    "Wear gloves, helmet, and safety shoes when handling ropes or wires.",
    "Never stand in the bight of a line under tension or inside a potential snap-back area.",
    "Check winch brakes, stoppers, and fairleads before operation.",
    "Keep decks clean and dry — most slips and falls occur due to oil or water residues.",
    "Ensure proper lighting on deck during night operations.",
    "Never throw heaving lines directly at people — aim beside them.",

    // 🔥 Fire Safety
    "Conduct fire drills seriously — these prepare you for real emergencies.",
    "Know your fire station and assigned duties during fire drills.",
    "Keep flammable materials away from hot work or open flames.",
    "Check fire doors, detectors, and dampers regularly to ensure proper operation.",
    "Ensure all fire extinguishers are charged, sealed, and within inspection date.",
    "Close ventilation openings immediately when a fire is detected.",
    "Never block access to fire hydrants or emergency equipment.",
    "Raise the fire alarm immediately — never assume someone else will do it.",
    "Close all doors, hatches, and ventilation systems to cut off oxygen and prevent the fire from spreading.",
    "Use the correct type of fire extinguisher — never use water on electrical or oil fires",
    "If you are not directly involved in firefighting, proceed to your muster station and wait for further instructions.",
    "Wear full firefighting gear including fireman’s outfit and breathing apparatus before entering any smoke-filled area.",
    "Do not open any door that feels hot to the touch — this could lead to a flashover or explosion.",
    "Follow the orders of the Officer in Charge and never abandon your assigned station until officially relieved.",
    // ⚓ Tanker Safety
    "Always check that all cargo pipelines and valves are properly lined up before transfer.",
    "Bond and ground all hoses before cargo transfer to prevent static discharge.",
    "Never smoke or use open flames anywhere outside the designated smoking area.",
    "Keep portable radios and mobile phones away from cargo deck unless certified explosion-proof.",

    "Monitor tank pressure and temperature continuously when loading or discharging.",
    "Ensure all scuppers are plugged and save-alls are clean before cargo operations.",
    "Test gas concentration in enclosed spaces before entry — hydrocarbon vapors are deadly.",
    "Never discharge oil, garbage, or chemicals into the sea — comply with MARPOL regulations.",
    "Use spill trays and drip pans when transferring fuel or oil to prevent pollution.",
    "Report any accidental oil or chemical spill immediately to the bridge.",
    "Follow ballast water exchange procedures to prevent invasive species transfer.",
    "Segregate and properly label all waste before disposal or incineration.",
    // 🧭 Navigation & Bridge
    "Maintain a proper lookout — collision risk increases when you lose focus.",
    "Use all available means (visual, radar, AIS, ECDIS, sound signals) to assess the risk of collision.",
    "Verify radar, AIS, and ECDIS settings at the beginning of every watch to ensure accurate readings.",
    "Check compass errors and compare with gyro and magnetic readings regularly.",
    "Keep bridge equipment clean, operational, and ready for immediate use.",
    "Communicate clearly with the engine room before maneuvering or changing speed.",
    "Never leave the bridge unattended while on watch — call the Master if in doubt or in restricted visibility.",
    "Maintain a safe speed at all times according to visibility, traffic density, and maneuvering characteristics.",
    "Avoid distractions such as using mobile phones or engaging in unrelated conversations during watch.",
    "Ensure bridge lighting is properly adjusted at night to maintain night vision.",
    "Use binoculars and all available instruments to verify contacts and navigation marks.",
    "Maintain continuous monitoring of the vessel’s position — cross-check GPS with radar ranges, bearings, and visual fixes.",

    // ⚓ Engine Room Safety
    "Keep engine room clean and free from oil residues.",
    "Avoid using rags soaked with oil near hot surfaces.",
    "Test bilge alarms and emergency stops regularly.",
    "Always close the fuel oil quick closing valves when required.",
    "Wear ear protection — engine rooms are high noise zones.",

    // 🧠 Mental & Team Safety
    "Speak up if you’re unsure — assumptions cause accidents.",
    "Watch out for your crewmates; safety is teamwork.",
    "Report injuries immediately, no matter how small.",
    "Stay alert — your family is waiting for you to return home safely."
];
