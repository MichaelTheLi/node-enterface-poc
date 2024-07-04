import Node from "./entity/node.js";
import UINode from "./uiEntity/node.js";
import {demoPipeline, demoPipelineScene} from "./demo.js";

export default class PipelineScene {
    constructor(pipeline, elements, renderer) {
        this.pipeline = pipeline;
        this.renderer = renderer;
        this.elements = []

        this.keyModifiers = {}

        // TODO Plugins
        this.currentConnection = null;
        this.nodeUnderMouse = null
    }

    setup () {
        this.renderer.setup(this);
        this.elements.push(this);
    }

    onSetup () {
        // TODO plugins
        demoPipeline(this.pipeline)
        demoPipelineScene(
            this,
            this.renderer.p.width / 2.0,
            this.renderer.p.height / 2.0
        )
    }

    drawLoop() {
        this.elements.forEach((element) => {
            element.acceptVisitor(this.renderer)
        })
    }

    acceptVisitor(visitor) {
        visitor.visitScene(this)
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
                    this.elements.push(this.currentConnection)
                }
            } else {
                if (this.currentConnection) {
                    this.currentConnection.toNode = this.nodeUnderMouse;
                    // this.nodeUnderMouse.connections.push(this.currentConnection)
                    this.currentConnection = null;
                } else {
                    this.nodeUnderMouse.movingAnchor = {x: x - this.nodeUnderMouse.x, y: y - this.nodeUnderMouse.y};
                    // p.fill(255, 255, 255); // TODO ?
                }
            }
        } else {
            if (this.keyModifiers.cmd) {
                const node = new Node(
                    Math.random()
                )
                this.pipeline.nodes.push(node);
                this.elements.push(new UINode(
                    node,
                    x,
                    y,
                    50,
                    50
                ))
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
        // TODO Baaaad way to do it
        this.elements.forEach((node) => {
            if (node.isHit) {
                node.selected = node.isHit(x, y);
                if (node.selected) {
                    // TODO Multiple nodes under mouse
                    this.nodeUnderMouse = node
                }
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

        // if (key === 'Escape') {
        //     const iToRemove = this.currentConnection.connection.fromNode.connections.indexOf(this.currentConnection);
        //     this.currentConnection.fromBox.connections.splice(iToRemove, 1)
        //
        //     this.currentConnection = null;
        // }

        console.log(this.keyModifiers)
    }
}
