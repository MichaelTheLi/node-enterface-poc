const boxes = []
let boxUnderMouse = null;
let currentConnection = null;
let windowCenterX;
let windowCenterY;
const keyModifiers = {
    cmd: false,
    shift: false,
    alt: false,
}

class Connection {
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

class Box {
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

function setup() {
    createCanvas(1280, 640, document.querySelector('#main'));
    // stroke(255);
    // noFill();

    windowCenterX = width / 2.0;
    windowCenterY = height / 2.0;

    boxes.push(new Box(
        windowCenterX - 150,
        windowCenterY + 75,
        50,
        50
    ));
    boxes.push(new Box(
        windowCenterX + 150,
        windowCenterY - 75,
        50,
        50
    ));
    const conn1 = new Connection(
        boxes[0],
        boxes[1]
    )
    boxes[0].connections.push(conn1)
    boxes[1].connections.push(conn1)
    const conn2 = new Connection(
        boxes[0],
        boxes[1]
    )
    boxes[0].connections.push(conn2)
    boxes[1].connections.push(conn2)

    rectMode(RADIUS);
    strokeWeight(2);
}

function draw() {
    background(0);

    boxUnderMouse = null;
    boxes.forEach((box) => {
        // Test if the cursor is over the box
        if (box.isHit(mouseX, mouseY)) {
            boxUnderMouse = box;

            stroke(255);
            fill(244, 122, 158);
        } else {
            stroke(156, 39, 176);
            fill(244, 122, 158);
        }

        rect(box.x, box.y, box.w, box.h);

        stroke(255);
        noFill();
    });

    boxes.forEach((box) => {
        // Connection drawn multiple times - by fromBox and by toBox. some set() should be utilised
        box.connections.forEach((connection) => {
            bezier(
                connection.fromPos.x,
                connection.fromPos.y,

                connection.curve1.x,
                connection.curve1.y,

                connection.curve2.x,
                connection.curve2.y,

                connection.endPos.x,
                connection.endPos.y,
            );
        })
    })
}

function mousePressed() {
    if (boxUnderMouse) {
        if (keyModifiers.alt) {
            const iToRemove = boxes.indexOf(boxUnderMouse);
            boxes.splice(iToRemove, 1);
            boxUnderMouse = null;
        } else if (keyModifiers.shift) {
            if (!currentConnection) {
                currentConnection = boxUnderMouse.createFromConnection({
                    x: mouseX,
                    y: mouseY
                })
            }
        } else {
            if (currentConnection) {
                currentConnection.toBox = boxUnderMouse;
                boxUnderMouse.connections.push(currentConnection)
                currentConnection = null;
            } else {
                boxUnderMouse.movingAnchor = {x: mouseX - boxUnderMouse.x, y: mouseY - boxUnderMouse.y};
                fill(255, 255, 255);
            }
        }
    } else {
        if (keyModifiers.cmd) {
            boxes.push(new Box(
                mouseX,
                mouseY,
                50,
                50
            ));
        }
    }
}

function mouseDragged() {
    if (boxUnderMouse && boxUnderMouse.movingAnchor) {
        boxUnderMouse.x = mouseX - boxUnderMouse.movingAnchor.x;
        boxUnderMouse.y = mouseY - boxUnderMouse.movingAnchor.y;
    }
}

function mouseMoved() {
    if (currentConnection) {
        currentConnection.tempEnd.x = mouseX
        currentConnection.tempEnd.y = mouseY
    }
}

function keyPressed() {
    console.log(key)
    // Save as is, no need to constrain the properties
    if (key === 'Meta') {
        keyModifiers.cmd = true;
    }
    if (key === 'Shift') {
        keyModifiers.shift = true;
    }
    if (key === 'Alt') {
        keyModifiers.alt = true;
    }

    if (key === 'Escape') {
        const iToRemove = currentConnection.fromBox.connections.indexOf(currentConnection);
        currentConnection.fromBox.connections.splice(iToRemove, 1)

        currentConnection = null;
    }
}

function keyReleased() {
    if (key === 'Meta') {
        keyModifiers.cmd = false;
    }
    if (key === 'Shift') {
        keyModifiers.shift = false;
    }
    if (key === 'Alt') {
        keyModifiers.alt = false;
    }
}
function mouseReleased() {
    if (boxUnderMouse) {
        boxUnderMouse.movingAnchor = null;
    }
}

