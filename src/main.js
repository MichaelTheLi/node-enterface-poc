import '../assets/style.css';
import PipelineScene from "./pipelineScene.js";
import Pipeline from "./pipeline.js";
import P5Renderer from "./p5/p5renderer.js";


let renderer = new P5Renderer()
let scene = new PipelineScene(
    new Pipeline([]),
    [],
    renderer,
)

scene.setup()
