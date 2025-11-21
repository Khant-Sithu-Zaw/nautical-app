export default class User {
    constructor({
        name = "",
        birthday = null,
        nationality = "",
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
    } = {}) {
        this.name = name;
        this.birthday = birthday;
        this.nationality = nationality;
        this.passport = passport;
        this.sirb = sirb;
        this.rank = rank;
        this.address = address;
        this.objective = objective;
        this.email = email;
        this.phone = phone;
        this.image = image;

        this.certificates = certificates;      // array of { title, issuedBy, expiryDate }
        this.seaTimeRecords = seaTimeRecords;  // array of { vesselName, rank, fromDate, toDate, duration }
        this.skills = skills;                  // array of strings
    }
}