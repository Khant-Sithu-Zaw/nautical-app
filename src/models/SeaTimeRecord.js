export class SeaTimeRecord {
    constructor({ shipName = "", shipType = "", companyName = "", fromDate = "", toDate = "", grt = "", position = "", imoNo = "", enginePowerKW = "" } = {}) {
        this.shipName = shipName;
        this.shipType = shipType;
        this.companyName = companyName;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.position = position;
        this.imoNo = imoNo;
        this.grt = grt;
        this.enginePowerKW = enginePowerKW;
    }
}