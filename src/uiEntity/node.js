import Connection from "./connection.js";

export default class Node {
    constructor(node, x, y, w, h) {
        this.node = node;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.selected = false
    }

    acceptVisitor(visitor) {
        visitor.visitNode(this)
    }

    isHit (x, y) {
        const xHit = x > this.x - this.w && x < this.x + this.w;
        const yHit = y > this.y - this.h && y < this.y + this.h;

        return xHit && yHit;
    }

    createFromConnection(tempEnd) {
        return new Connection(this, null, tempEnd);
    }
}
