import '../assets/style.css';
import PipelineScene from "./pipelineScene.js";
import Pipeline from "./pipeline.js";
import P5Renderer from "./p5/p5renderer.js";
import Oscillator from "./entity/oscillator.js";
import Value from "./entity/value.js";


let renderer = new P5Renderer()
let scene = new PipelineScene(
    new Pipeline([]),
    [],
    renderer,
)

scene.setup()

const osc = new Oscillator('sin');

osc.input('freq', new Value(100));
osc.output('main', (val) => {
    console.log(val);
});

osc.process(0, 1, 1000)