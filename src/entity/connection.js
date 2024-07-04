export default class Connection {
    constructor(fromBox, toBox, tempEnd) {
        this.fromBox = fromBox;
        this.toBox = toBox;
        this.tempEnd = tempEnd;
    }

    get fromPos() {
        return {
            x: this.fromBox.x + this.fromBox.w,
            y: this.fromBox.y - this.fromBox.h + 10 + 10 * this.fromBox.connections.indexOf(this),
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
        return this.fromBox.connections.indexOf(this);
    }

    get toIndex() {
        let mixIn = 0;

        if (this.toBox) {
            mixIn = this.toBox.connections.indexOf(this);
        }

        return mixIn
    }

    get endPos() {
        return {
            x: this.toBox
                ? this.toBox.x - this.toBox.w
                : this.tempEnd.x,
            y: this.toBox
                ? this.toBox.y - this.toBox.h + 20 + 10 * this.toBox.connections.indexOf(this)
                : this.tempEnd.y,
        }
    }

    get length() {
        const w = this.fromPos.x - this.endPos.x
        const h = this.fromPos.y - this.endPos.y
        return Math.sqrt(w * w + h * h)
    }
}
