import p5 from "p5";
// TODO Create another one for https://pixijs.com
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

        this.p.strokeWeight(2);
        this.p.stroke(50);
        this.p.fill(255, 255, 255);
        this.p.textSize(12);
        this.p.textAlign(this.p.CENTER);
        this.p.text(node.name, node.x, node.y - node.h + 12 + 2);

        const inputs = node.node.getInputs();
        let i = 0;
        Object.keys(inputs).forEach((key) => {
            this.p.strokeWeight(1);
            this.p.stroke(50);
            this.p.fill(255, 255, 255);
            this.p.textSize(10);
            this.p.textAlign(this.p.LEFT);
            const x = node.x - node.w + 10;
            const y = node.y - node.h + i + 10;
            this.p.text(key, x+8, y+3);

            this.p.strokeWeight(1);
            this.p.stroke(255);
            this.p.fill(100, 100, 50);
            this.p.circle(x, y, 10);
            i += 10
        })

        const outputs = node.node.getOutputs();
        let j = 0;
        Object.keys(outputs).forEach((key) => {
            this.p.strokeWeight(1);
            this.p.stroke(50);
            this.p.fill(255, 255, 255);
            this.p.textSize(10);
            this.p.textAlign(this.p.RIGHT);
            const x = node.x + node.w - 10;
            const y = node.y - node.h + j + 10;
            this.p.text(key, x-8, y+3);

            this.p.strokeWeight(1);
            this.p.stroke(255);
            this.p.fill(100, 50, 100);
            this.p.circle(x, y, 10);
            j += 10
        })
    }

    visitConnection(connection) {
        this.p.stroke(255);
        this.p.noFill();
        this.p.strokeWeight(2);
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