export class Passport {
    constructor({ pno = "", issuedPlace = "", issuedDate = "", expiredDate = "" } = {}) {
        this.pno = pno;
        this.issuedPlace = issuedPlace;
        this.issuedDate = issuedDate;
        this.expiredDate = expiredDate;
    }
}