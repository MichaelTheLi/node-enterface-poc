import p5 from "p5";

export default class P5Renderer {
    constructor() {
        // noinspection JSPotentiallyInvalidConstructorUsage
        this.p = new p5(this.setupSketch.bind(this))
    }
    setup(scene) {
        this.scene = scene
    }

    setupSketch (p) {
        let keysMap = {
            "Escape": "esc",
            "Cmd": "cmd",
            "Meta": "cmd",
            "Shift": "shift",
            "Alt": "alt",
        }

        p.setup = () => {
            // TODO ID
            p.createCanvas(1280, 640, document.querySelector('#main'));

            this.scene.onSetup()
        }

        p.draw = () => {
            this.scene.drawLoop()
        }

        p.mousePressed = () => {
            this.scene.mousePressed(p.mouseX, p.mouseY)
        }

        p.mouseDragged = () => {
            this.scene.mouseDragged(p.mouseX, p.mouseY)
        }

        p.mouseMoved = () => {
            this.scene.mouseMoved(p.mouseX, p.mouseY)
        }

        p.keyPressed = () => {
            this.scene.keyPressed(keysMap[p.key] || p.key)
        }

        p.keyReleased = () => {
            this.scene.keyReleased(keysMap[p.key] || p.key)
        }

        p.mouseReleased = () => {
            this.scene.mouseReleased(p.mouseX, p.mouseY)
        }
    }

    visitScene(scene) {
        this.p.background(0);
    }

    visitNode(node) {
        this.p.rectMode(this.p.RADIUS);
        this.p.strokeWeight(2);

        if (node.selected) {
            this.p.stroke(255);
            this.p.fill(244, 122, 158);
        } else {
            this.p.stroke(156, 39, 176);
            this.p.fill(244, 122, 158);
        }

        this.p.rect(node.x, node.y, node.w, node.h);

        this.p.stroke(255);
        this.p.noFill();
    }

    visitConnection(connection) {
        this.p.bezier(
            connection.fromPos.x,
            connection.fromPos.y,

            connection.curve1.x,
            connection.curve1.y,

            connection.curve2.x,
            connection.curve2.y,

            connection.endPos.x,
            connection.endPos.y,
        );
    }
}