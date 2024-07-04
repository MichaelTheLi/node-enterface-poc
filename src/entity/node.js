import Connection from "./connection.js";

export default class Node {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.connections = [];
    }

    isHit (x, y) {
        const xHit = x > this.x - this.w && x < this.x + this.w;
        const yHit = y > this.y - this.h && y < this.y + this.h;

        return xHit && yHit;
    }

    createFromConnection(tempEnd) {
        const conn = new Connection(this, null, tempEnd);
        this.addConnection(conn);

        return conn;
    }

    addConnection(connection) {
        this.connections.push(connection)
    }
}
