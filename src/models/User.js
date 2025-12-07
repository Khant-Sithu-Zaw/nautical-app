export default class User {
    constructor({
        name = "",
        birthday = null,
        nationality = "",
        edu = "",
        passport = "",
        sirb = "",
        rank = "",
        address = "",
        objective = "",
        email = "",
        phone = "",
        image = null,              // URI of profile image
        certificates = [],         // Array of Certificate objects
        seaTimeRecords = [],       // Array of SeaTimeRecord objects
        skills = [],               // Array of strings
        hobbies = [],               // Array of strings
    } = {}) {
        this.name = name;
        this.birthday = birthday;
        this.edu = edu;
        this.nationality = nationality;
        this.passport = passport;
        this.sirb = sirb;
        this.rank = rank;
        this.address = address;
        this.objective = objective;
        this.email = email;
        this.phone = phone;
        this.image = image;
        this.hobbies = hobbies;
        this.certificates = certificates;      // array of { title, issuedBy, expiryDate }
        this.seaTimeRecords = seaTimeRecords;  // array of { vesselName, rank, fromDate, toDate, duration }
        this.skills = skills;                  // array of strings
    }
}