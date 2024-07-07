export default class Oscillator {
    constructor(type) {
        this.inputs = {
            freq: 1000
        }
        this.outputs = {
            main: (val) => {}
        }

        this.type = type;
    }

    input(key, value) {
        this.inputs[key] = value;
    }

    output(key, value) {
        this.outputs[key] = value
    }

    process(startSec, secs, resolution) {
        const freq = this.inputs.freq.val;

        for (let point = 0; point < resolution; point++) {
            // TODO Strategy-like generator
            if (this.type === 'sin') {
                const period = 1 / freq
                const b = 2 * Math.PI / period
                const t = point / resolution * secs
                const value = (startSec + t) * b
                const y = Math.sin(value)
                this.outputs.main(y)
            }
        }
    }
}
