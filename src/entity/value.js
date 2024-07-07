export default class Value {
    constructor(val) {
        this.rawValue = val
    }

    get val() {
        if (typeof this.rawValue === 'function') {
            return this.rawValue();
        }

        return this.rawValue
    }
}
