export class Certificate {
    constructor({ title = "", expiredDate = "", issuedDate = "", } = {}) {
        this.title = title;
        this.expiredDate = expiredDate;
        this.issuedDate = issuedDate;
    }
}