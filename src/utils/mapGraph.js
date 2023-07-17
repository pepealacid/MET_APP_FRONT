import museumMatrix from "../data/museumMatrix"
import floorConnexions from "../data/floorConnexions";

class Graph {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.adjList = new Map();
    }

    addVertex(vertex) {
        this.adjList.set(vertex, []);
    }

    addEdge(vertex1, vertex2) {
        if (!this.adjList.has(vertex1)) {
            this.addVertex(vertex1);
        }
        if (!this.adjList.has(vertex2)) {
            this.addVertex(vertex2);
        }
        this.adjList.get(vertex1).push(vertex2);
        this.adjList.get(vertex2).push(vertex1);
    }

    dijkstra(vertices) {
        const distances = new Map();
        const previous = new Map();
        const queue = [];

        for (let vertex of this.adjList.keys()) {
            distances.set(vertex, Infinity);
            previous.set(vertex, null);
        }

        const startVertex = vertices[0];
        distances.set(startVertex, 0);
        queue.push(startVertex);

        while (queue.length > 0) {
            const currentVertex = queue.shift();

            for (let neighbor of this.adjList.get(currentVertex)) {
                const distance = distances.get(currentVertex) + 1;
                if (distance < distances.get(neighbor)) {
                    distances.set(neighbor, distance);
                    previous.set(neighbor, currentVertex);
                    queue.push(neighbor);
                }
            }
        }

        let maxDistanceVertex = vertices[0];
        for (let vertex of vertices) {
            if (distances.get(vertex) > distances.get(maxDistanceVertex)) {
                maxDistanceVertex = vertex;
            }
        }

        const shortestPath = [];
        let currentVertex = maxDistanceVertex;
        while (currentVertex !== null) {
            shortestPath.unshift(currentVertex);
            currentVertex = previous.get(currentVertex);
        }

        return shortestPath;
    }

    findShortestSubarray(arrays) {
        let shortestLength = Infinity;
        let shortestSubarray = null;
        for (let subarray of arrays) {
            const length = subarray.length;
            if (length < shortestLength) {
                shortestLength = length;
                shortestSubarray = subarray;
            }
        }
        return shortestSubarray;
    }

    findShortestPath(vertices) {
        if (vertices.length) {
            let path = vertices.map((vertex) => this.dijkstra(["Entrance", vertex]))
            path = this.findShortestSubarray(path)
            console.log("finding path.... ")
            let lastVertex = path[path.length - 1]

            vertices = vertices.filter(vertex => vertex !== lastVertex)


            // change to while when it starts working
            while (vertices.length) {
                //we find the next shortest paths
                let tempPaths = vertices.map((vertex) => this.dijkstra([lastVertex, vertex]))
                //we select the shortest of them all
                tempPaths = this.findShortestSubarray(tempPaths)
                //we join the temp to path 
                path = [...path, ...tempPaths.slice(1)]
                // we renew the last vertex
                lastVertex = path[path.length - 1]
                console.log("Trying from", lastVertex)
                // we remove the vertex from the vertex list
                vertices = vertices.filter(vertex => vertex !== lastVertex)
                console.log("trying to find", vertices)
            }
            console.log("the found path is", path)
            return path
        }

    }
}

const graph = new Graph(museumMatrix.length);

museumMatrix.forEach(vertex => {
    graph.addVertex(vertex.vertex);
    vertex.connexions.forEach(connexion => {
        graph.addEdge(vertex.vertex, connexion);
    });
});


floorConnexions.forEach(vertex => {
    vertex.connexions.forEach(connexion => {
        graph.addEdge(vertex.vertex, connexion);
    });
});

export default graph


