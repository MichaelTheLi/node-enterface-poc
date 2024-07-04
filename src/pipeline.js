export default class Pipeline {
    constructor(nodes) {
        // TODO effective hashmap without bs with ownProperty?
        this.nodes = [];
        this.map = {}

        nodes.forEach((node) => {
            this.addNode(node)
        })
    }
    
    addNode(node) {
        this.nodes.push(node);
        this.map[node.id] = node
    }

    getNode(id) {
        return this.map[id]
    }
}
