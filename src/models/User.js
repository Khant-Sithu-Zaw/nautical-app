import { CDC } from "./CDC";
import { Kin } from "./Kin";
import { Passport } from "./Passport";

export default class User {
    constructor({
        name = "",
        birthday = null,
        nationality = "",
        passport = new Passport(),
        martialSts = "",
        rank = "",
        address = "",
        gender = "",
        objective = "",
        height = "",
        weight = "",
        email = "",
        phone = "",
        image = null,
        cdc = new CDC(),
        kin = new Kin(),
        educations = [],             // URI of profile image
        certificates = [],         // Array of Certificate objects
        seaTimeRecords = [],       // Array of SeaTimeRecord objects
        skills = [],               // Array of strings
        hobbies = [],               // Array of strings
    } = {}) {
        this.name = name;
        this.birthday = birthday;
        this.nationality = nationality;
        this.passport = passport;
        this.martialSts = martialSts;
        this.rank = rank;
        this.gender = gender;
        this.address = address;
        this.cdc = cdc;
        this.kin = kin;
        this.objective = objective;
        this.email = email;
        this.height = height;
        this.weight = weight;
        this.phone = phone;
        this.image = image;
        this.hobbies = hobbies;
        this.educations = educations;      // array of { eduName, fromDate, toDate }
        this.certificates = certificates;      // array of { title, issuedBy, expiryDate }
        this.seaTimeRecords = seaTimeRecords;  // array of { vesselName, rank, fromDate, toDate, duration }
        this.skills = skills;                  // array of strings
    }
}