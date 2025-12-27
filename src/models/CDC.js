export class CDC {
    constructor({ sirb = "", issuedPlace = "", issuedDate = "", expiredDate = "" } = {}) {
        this.sirb = sirb;
        this.issuedPlace = issuedPlace;
        this.issuedDate = issuedDate;
        this.expiredDate = expiredDate;
    }
}