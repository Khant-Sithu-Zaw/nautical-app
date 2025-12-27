export class Education {
    constructor({ eduName = "", eduFromDate = "", eduToDate = "" } = {}) {
        this.eduName = eduName;
        this.eduFromDate = eduFromDate;
        this.eduToDate = eduToDate;
    }
}