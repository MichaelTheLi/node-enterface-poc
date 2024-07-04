import Node from "./entity/node.js";

export default class PipelineScene {
    constructor(pipeline) {
        this.pipeline = pipeline;

        this.keyModifiers = {}

        this.currentConnection = null;
        this.nodeUnderMouse = null
    }

    mousePressed (x, y) {
        if (this.nodeUnderMouse) {
            if (this.keyModifiers.alt) {
                const iToRemove = this.pipeline.nodes.indexOf(this.nodeUnderMouse);
                this.pipeline.nodes.splice(iToRemove, 1);
                this.nodeUnderMouse = null;
            } else if (this.keyModifiers.shift) {
                if (!this.currentConnection) {
                    this.currentConnection = this.nodeUnderMouse.createFromConnection({
                        x: x,
                        y: y
                    })
                }
            } else {
                if (this.currentConnection) {
                    this.currentConnection.toBox = this.nodeUnderMouse;
                    this.nodeUnderMouse.connections.push(this.currentConnection)
                    this.currentConnection = null;
                } else {
                    this.nodeUnderMouse.movingAnchor = {x: x - this.nodeUnderMouse.x, y: y - this.nodeUnderMouse.y};
                    // p.fill(255, 255, 255);
                }
            }
        } else {
            if (this.keyModifiers.cmd) {
                this.pipeline.nodes.push(new Node(
                    x,
                    y,
                    50,
                    50
                ));
            }
        }
    }

    mouseDragged (x, y) {
        if (this.nodeUnderMouse && this.nodeUnderMouse.movingAnchor) {
            this.nodeUnderMouse.x = x - this.nodeUnderMouse.movingAnchor.x;
            this.nodeUnderMouse.y = y - this.nodeUnderMouse.movingAnchor.y;
        }
    }

    mouseMoved (x, y) {
        if (this.currentConnection) {
            this.currentConnection.tempEnd.x = x
            this.currentConnection.tempEnd.y = y
        }
        this.nodeUnderMouse = null;
        this.pipeline.nodes.forEach((node) => {
            if (node.isHit(x, y)) {
                this.nodeUnderMouse = node;
            }
        })
    }

    mouseReleased (x, y) {
        if (this.nodeUnderMouse) {
            this.nodeUnderMouse.movingAnchor = null;
        }
    }

    keyReleased (key) {
        this.keyModifiers[key] = false;

        console.log(this.keyModifiers)
    }

    keyPressed (key) {
        this.keyModifiers[key] = true;

        if (key === 'Escape') {
            const iToRemove = this.currentConnection.fromBox.connections.indexOf(this.currentConnection);
            this.currentConnection.fromBox.connections.splice(iToRemove, 1)

            this.currentConnection = null;
        }

        console.log(this.keyModifiers)
    }
}

export function demoPipelineScene(pipeline) {
    return new PipelineScene(pipeline);
}