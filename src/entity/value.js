export default class Value {
    constructor(val) {
        this.rawValue = val
    }

    val(t) {
        if (typeof this.rawValue === 'function') {
            return this.rawValue(t);
        }

        return this.rawValue
    }
}
