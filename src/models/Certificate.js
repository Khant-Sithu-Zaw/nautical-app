export class Certificate {
    constructor({ title = "", issuedBy = "", expiryDate = "" } = {}) {
        this.title = title;
        this.issuedBy = issuedBy;
        this.expiryDate = expiryDate;
    }
}