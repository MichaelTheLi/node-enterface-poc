// TODO Complex nodes system: build complex blocks from low-level blocks
export default class Node {
    constructor(id) {
        this.id = id;
        this.inputs = {};
        this.outputs = {};
    }

    getInputs() {
        return this.inputs;
    }
    getOutputs() {
        return this.outputs;
    }

    setInput(key, value) {
        this.inputs[key] = value;
    }

    setOutput(key, value) {
        this.outputs[key] = value
    }

    getOutput(key) {
        return this.outputs[key].bind(this)
    }
}
