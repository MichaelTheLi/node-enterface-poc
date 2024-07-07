import Node from './node.js'
import Value from "./value.js";

export default class Oscillator extends Node {
    constructor(id, type) {
        super(id);

        this.inputs = {
            freq: new Value(1000)
        }
        this.outputs = {
            main: this.main
        }

        this.type = type;
    }

    main(t) {
        const freq = this.inputs.freq.val(t);

        // TODO Strategy-like oscillator
        if (this.type === 'sin') {
            const b = 2 * Math.PI * freq
            return Math.sin(t * b)
        }

        throw new Error('Unknown type')
    }
}
