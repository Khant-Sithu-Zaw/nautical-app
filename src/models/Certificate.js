export class Certificate {
    constructor({ title = "", expiredDate = "", issuedDate = "", country = "" } = {}) {
        this.title = title;
        this.expiredDate = expiredDate;
        this.issuedDate = issuedDate;
        this.country = country;
    }
}