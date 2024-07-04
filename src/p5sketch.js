import Box from "./entity/box.js";
import Connection from "./entity/connection.js";

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

export const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(1280, 640, document.querySelector('#main'));
        // stroke(255);
        // noFill();

        windowCenterX = p.width / 2.0;
        windowCenterY = p.height / 2.0;

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

        p.rectMode(p.RADIUS);
        p.strokeWeight(2);
    }

    p.draw = () => {
        p.background(0);

        boxUnderMouse = null;
        boxes.forEach((box) => {
            // Test if the cursor is over the box
            if (box.isHit(p.mouseX, p.mouseY)) {
                boxUnderMouse = box;

                p.stroke(255);
                p.fill(244, 122, 158);
            } else {
                p.stroke(156, 39, 176);
                p.fill(244, 122, 158);
            }

            p.rect(box.x, box.y, box.w, box.h);

            p.stroke(255);
            p.noFill();
        });

        boxes.forEach((box) => {
            // Connection drawn multiple times - by fromBox and by toBox. some set() should be utilised
            box.connections.forEach((connection) => {
                p.bezier(
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

    p.mousePressed = () => {
        if (boxUnderMouse) {
            if (keyModifiers.alt) {
                const iToRemove = boxes.indexOf(boxUnderMouse);
                boxes.splice(iToRemove, 1);
                boxUnderMouse = null;
            } else if (keyModifiers.shift) {
                if (!currentConnection) {
                    currentConnection = boxUnderMouse.createFromConnection({
                        x: p.mouseX,
                        y: p.mouseY
                    })
                }
            } else {
                if (currentConnection) {
                    currentConnection.toBox = boxUnderMouse;
                    boxUnderMouse.connections.push(currentConnection)
                    currentConnection = null;
                } else {
                    boxUnderMouse.movingAnchor = {x: p.mouseX - boxUnderMouse.x, y: p.mouseY - boxUnderMouse.y};
                    p.fill(255, 255, 255);
                }
            }
        } else {
            if (keyModifiers.cmd) {
                boxes.push(new Box(
                    p.mouseX,
                    p.mouseY,
                    50,
                    50
                ));
            }
        }
    }

    p.mouseDragged = () => {
        if (boxUnderMouse && boxUnderMouse.movingAnchor) {
            boxUnderMouse.x = p.mouseX - boxUnderMouse.movingAnchor.x;
            boxUnderMouse.y = p.mouseY - boxUnderMouse.movingAnchor.y;
        }
    }

    p.mouseMoved = () => {
        if (currentConnection) {
            currentConnection.tempEnd.x = p.mouseX
            currentConnection.tempEnd.y = p.mouseY
        }
    }

    p.keyPressed = () => {
        console.log(p.key)
        // Save as is, no need to constrain the properties
        if (p.key === 'Meta') {
            keyModifiers.cmd = true;
        }
        if (p.key === 'Shift') {
            keyModifiers.shift = true;
        }
        if (p.key === 'Alt') {
            keyModifiers.alt = true;
        }

        if (p.key === 'Escape') {
            const iToRemove = currentConnection.fromBox.connections.indexOf(currentConnection);
            currentConnection.fromBox.connections.splice(iToRemove, 1)

            currentConnection = null;
        }
    }
    p.keyReleased = () => {
        if (p.key === 'Meta') {
            keyModifiers.cmd = false;
        }
        if (p.key === 'Shift') {
            keyModifiers.shift = false;
        }
        if (p.key === 'Alt') {
            keyModifiers.alt = false;
        }
    }

    p.mouseReleased = () => {
        if (boxUnderMouse) {
            boxUnderMouse.movingAnchor = null;
        }
    }

}
