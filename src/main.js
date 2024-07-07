import '../assets/style.css';
import PipelineScene from "./pipelineScene.js";
import Pipeline from "./pipeline.js";
import P5Renderer from "./p5/p5renderer.js";
import Oscillator from "./entity/oscillator.js";
import Value from "./entity/value.js";
import Amplifier from "./entity/amplifier.js";


let renderer = new P5Renderer()
let scene = new PipelineScene(
    new Pipeline([]),
    [],
    renderer,
)

scene.setup()

const oscillator = new Oscillator('#1', 'sin')
oscillator.setInput('freq', new Value(1));
const amplifier = new Amplifier('#2', 3)
amplifier.setInput('main', new Value(oscillator.getOutput('main')))

const startSec = 0;
const resolution = 100;
const secs = 1;
for (let point = 0; point < resolution; point++) {
    const value = amplifier.getOutput('main')
    console.log(value(startSec + point / resolution * secs));
}