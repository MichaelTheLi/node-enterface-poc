import {demoPipelineScene} from "./pipelineScene.js";
import {demoPipeline} from "./pipeline.js";

let windowCenterX;
let windowCenterY;

export const sketch = (p) => {
    let pipeline = null
    let pipelineScene = null
    let keysMap = {
        "Escape": "esc",
        "Cmd": "cmd",
        "Meta": "cmd",
        "Shift": "shift",
        "Alt": "alt",
    }

    p.setup = () => {
        p.createCanvas(1280, 640, document.querySelector('#main'));

        windowCenterX = p.width / 2.0;
        windowCenterY = p.height / 2.0;

        pipelineScene = demoPipelineScene(demoPipeline(windowCenterX, windowCenterY))
        pipeline = pipelineScene.pipeline
    }

    p.draw = () => {
        if (pipelineScene === null) {
            return;
        }
        p.rectMode(p.RADIUS);
        p.strokeWeight(2);
        p.background(0);

        pipeline.nodes.forEach((node) => {
            // Test if the cursor is over the node
            if (node === pipelineScene.nodeUnderMouse) {
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

        pipeline.nodes.forEach((node) => {
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
        pipelineScene.mousePressed(p.mouseX, p.mouseY)
    }

    p.mouseDragged = () => {
        pipelineScene.mouseDragged(p.mouseX, p.mouseY)
    }

    p.mouseMoved = () => {
        pipelineScene.mouseMoved(p.mouseX, p.mouseY)
    }

    p.keyPressed = () => {
        pipelineScene.keyPressed(keysMap[p.key] || p.key)
    }

    p.keyReleased = () => {
        pipelineScene.keyReleased(keysMap[p.key] || p.key)
    }

    p.mouseReleased = () => {
        pipelineScene.mouseReleased(p.mouseX, p.mouseY)
    }
}
