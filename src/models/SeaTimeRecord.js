export class SeaTimeRecord {
    constructor({ vesselName = "", rank = "", fromDate = "", toDate = "", duration = "" } = {}) {
        this.vesselName = vesselName;
        this.rank = rank;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.duration = duration;
    }
}