export class Kin {
    constructor({ kinType = "", kinName = "", kinPhone = "", kinAddr = "", } = {}) {
        this.kinType = kinType;
        this.kinName = kinName;
        this.kinPhone = kinPhone;
        this.kinAddr = kinAddr;
    }
}