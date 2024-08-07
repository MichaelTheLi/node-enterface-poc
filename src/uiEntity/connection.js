export default class Connection {
    fromPin;
    toPin;
    constructor(fromNode, fromPin, toNode, toPin, tempEnd) {
        this.fromNode = fromNode;
        this.fromPin = fromPin;

        this.toNode = toNode;
        this.toPin = toPin;

        this.tempEnd = tempEnd;
    }

    acceptVisitor(visitor) {
        visitor.visitConnection(this)
    }

    get fromPos() {
        return {
            x: this.fromNode.x + this.fromNode.w,
            y: this.fromNode.y - this.fromNode.h + 10 + 10 * this.fromIndex,
        }
    }

    get curve1() {
        let mixIn = 5 * this.fromIndex;

        if (this.endPos.y > this.fromPos.y) {
            mixIn *= -1;
        }

        return {
            x: this.fromPos.x + this.length / 2 + mixIn,
            y: this.fromPos.y,
        }
    }

    get curve2() {
        let mixIn = 5 * this.toIndex;

        if (this.endPos.y > this.fromPos.y) {
            mixIn *= -1;
        }

        return {
            x: this.endPos.x - this.length / 2 + mixIn,
            y: this.endPos.y,
        }
    }

    get fromIndex() {
        const outputs = Object.keys(this.fromNode.node.getOutputs())
        return this.fromNode
            ? outputs.indexOf(this.fromPin)
            : 0;
    }

    get toIndex() {
        let mixIn = 0;

        if (this.toNode) {
            const inputs = Object.keys(this.toNode.node.getInputs())
            mixIn = inputs.indexOf(this.toPin);
        }

        return mixIn
    }

    get endPos() {
        return {
            x: this.toNode
                ? this.toNode.x - this.toNode.w
                : this.tempEnd.x,
            y: this.toNode
                ? this.toNode.y - this.toNode.h + 20 + 10 * this.toIndex
                : this.tempEnd.y,
        }
    }

    get length() {
        const w = this.fromPos.x - this.endPos.x
        const h = this.fromPos.y - this.endPos.y
        return Math.sqrt(w * w + h * h)
    }
}
