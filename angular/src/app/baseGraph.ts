import {Vector3} from "three";

export class Node<T> {

  data: T;
  draw;
  pos: Vector3;
  adjacent: Node<T>[];

  comparator: (a: T, b: T) => number;


  constructor(data: T, comparator: (a: T, b: T) => number) {

    this.data = data;
    this.draw = {};
    // @ts-ignore
    this.pos = [];
    this.adjacent = [];

    this.comparator = comparator;

  }


  addAdjacent(node: Node<T>): void {

    this.adjacent.push(node);

  }


  removeAdjacent(data: T): Node<T> | null {

    const index = this.adjacent.findIndex(
      (node) => this.comparator(node.data, data) === 0
    );


    if (index > -1) {

      return this.adjacent.splice(index, 1)[0];

    }


    return null;

  }

}


export class Graph<T> {

  nodes: Map<T, Node<T>> = new Map();

  comparator: (a: T, b: T) => number;


  constructor(comparator: (a: T, b: T) => number) {

    this.comparator = comparator;

  }


  /**

   * Add a new node if it was not added before

   *

   * @param {T} data

   * @returns {Node<T>}

   */

  addNode(data: T): Node<T> {

    let node = this.nodes.get(data);


    if (node) return node;


    node = new Node(data, this.comparator);

    this.nodes.set(data, node);


    return node;

  }


  /**

   * Remove a node, also remove it from other nodes adjacency list

   *

   * @param {T} data

   * @returns {Node<T> | null}

   */

  removeNode(data: T): Node<T> | null {

    const nodeToRemove = this.nodes.get(data);


    if (!nodeToRemove) return null;


    this.nodes.forEach((node) => {

      node.removeAdjacent(nodeToRemove.data);

    });


    this.nodes.delete(data);


    return nodeToRemove;

  }


  /**

   * Create an edge between two nodes

   *

   * @param {T} source

   * @param {T} destination

   */

  addEdge(source: T, destination: T): void {

    var sourceNode, destinationNode;

    sourceNode = this.nodes.get(source);
    destinationNode = this.nodes.get(destination);

    if (!sourceNode) {
      sourceNode = this.addNode(source);
    }
    if (!destinationNode) {
      destinationNode = this.addNode(destination);
    }

    sourceNode.addAdjacent(destinationNode);

  }


  /**

   * Remove an edge between two nodes

   *

   * @param {T} source

   * @param {T} destination

   */

  removeEdge(source: T, destination: T): void {

    const sourceNode = this.nodes.get(source);

    const destinationNode = this.nodes.get(destination);


    if (sourceNode && destinationNode) {

      sourceNode.removeAdjacent(destination);

    }

  }

}

function comparator(a: string, b: string) {

  if (a < b) return -1;


  if (a > b) return 1;


  return 0;

}

