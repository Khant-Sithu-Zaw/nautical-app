export class SeaTimeRecord {
    constructor({ companyName = "", fromDate = "", toDate = "", workDescription = "", } = {}) {
        this.companyName = companyName;
        this.workDescription = workDescription;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}