export class SeaTimeRecord {
    constructor({ vesselName = "", rank = "", fromDate = "", toDate = "", workDetail = "" } = {}) {
        this.vesselName = vesselName;
        this.rank = rank;
        this.workDetail = workDetail;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}