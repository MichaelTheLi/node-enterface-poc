import Node from "./entity/node.js";

import {demoWorld} from "./world.js";

let nodeUnderMouse = null;
let currentConnection = null;
let windowCenterX;
let windowCenterY;

const keyModifiers = {
    cmd: false,
    shift: false,
    alt: false,
}

export const sketch = (p) => {
    let world = null

    p.setup = () => {
        p.createCanvas(1280, 640, document.querySelector('#main'));

        windowCenterX = p.width / 2.0;
        windowCenterY = p.height / 2.0;

        world = demoWorld(windowCenterX, windowCenterY)
        p.rectMode(p.RADIUS);
        p.strokeWeight(2);
    }

    p.draw = () => {
        p.background(0);

        nodeUnderMouse = null;
        world.nodes.forEach((node) => {
            // Test if the cursor is over the node
            if (node.isHit(p.mouseX, p.mouseY)) {
                nodeUnderMouse = node;

                p.stroke(255);
                p.fill(244, 122, 158);
            } else {
                p.stroke(156, 39, 176);
                p.fill(244, 122, 158);
            }

            p.rect(node.x, node.y, node.w, node.h);

            p.stroke(255);
            p.noFill();
        });

        world.nodes.forEach((node) => {
            // Connection drawn multiple times - by fromBox and by toBox. some set() should be utilised
            node.connections.forEach((connection) => {
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
        if (nodeUnderMouse) {
            if (keyModifiers.alt) {
                const iToRemove = nodes.indexOf(nodeUnderMouse);
                world.nodes.splice(iToRemove, 1);
                nodeUnderMouse = null;
            } else if (keyModifiers.shift) {
                if (!currentConnection) {
                    currentConnection = nodeUnderMouse.createFromConnection({
                        x: p.mouseX,
                        y: p.mouseY
                    })
                }
            } else {
                if (currentConnection) {
                    currentConnection.toBox = nodeUnderMouse;
                    nodeUnderMouse.connections.push(currentConnection)
                    currentConnection = null;
                } else {
                    nodeUnderMouse.movingAnchor = {x: p.mouseX - nodeUnderMouse.x, y: p.mouseY - nodeUnderMouse.y};
                    p.fill(255, 255, 255);
                }
            }
        } else {
            if (keyModifiers.cmd) {
                world.nodes.push(new Node(
                    p.mouseX,
                    p.mouseY,
                    50,
                    50
                ));
            }
        }
    }

    p.mouseDragged = () => {
        if (nodeUnderMouse && nodeUnderMouse.movingAnchor) {
            nodeUnderMouse.x = p.mouseX - nodeUnderMouse.movingAnchor.x;
            nodeUnderMouse.y = p.mouseY - nodeUnderMouse.movingAnchor.y;
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
        if (nodeUnderMouse) {
            nodeUnderMouse.movingAnchor = null;
        }
    }
}
