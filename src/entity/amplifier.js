import Node from './node.js'
import Value from "./value.js";

export default class Amplifier extends Node {
    constructor(id) {
        super(id);

        this.inputs = {
            main: new Value(0),
            gain: new Value(1)
        }
        this.outputs = {
            main: this.main
        }
    }

    main(t) {
        const val = this.inputs.main.val(t)

        return val * this.inputs.gain.val(t);
    }
}
