import UINode from "./uiEntity/node.js";
import UIConnection from "./uiEntity/connection.js";
import Oscillator from "./entity/oscillator.js";
import Amplifier from "./entity/amplifier.js";

export function demoPipeline(pipeline) {
    const oscillator = new Oscillator('#1', 'sin')
    const amplifier = new Amplifier('#2', 3)
    amplifier.setInput('main', oscillator.getOutput('main'))

    pipeline.addNode(oscillator)
    pipeline.addNode(amplifier)
}

export function demoPipelineScene(scene, xCenter, yCenter) {
    const node1 = new UINode(
        scene.pipeline.getNode('#1'),
        xCenter - 150,
        yCenter + 75,
        50,
        50
    )
    const node2 = new UINode(
        scene.pipeline.getNode('#2'),
        xCenter + 150,
        yCenter - 75,
        50,
        50
    )

    scene.elements.push(node1);
    scene.elements.push(node2);

    scene.elements.push(new UIConnection(node1, 'main', node2, 'main'))
    // scene.elements.push(new UIConnection(node1, node2))
}