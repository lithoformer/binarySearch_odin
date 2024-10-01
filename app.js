class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = new Node(null);
    }

    buildTree(arr, start, end) {
        let array = arr.sort((a, b) => { return a - b });
        array = [...new Set(array)];

        if (end > array.length - 1) {
            end = array.length - 1;
        }

        if (start > end) {
            return null;
        }

        let mid = parseInt((start + end) / 2);

        const node = new Node(array[mid]);

        node.left = this.buildTree(array, start, mid - 1);

        node.right = this.buildTree(array, mid + 1, end);

        return node;
    }

    insertItem(value, node) {

        if (node === null) {
            node = new Node(value);
            return node;
        }

        if (node.data === null) {
            node.data = value;
            return node;
        }

        if (node.data === value) {
            return node;
        }

        if (node.data > value) {
            node.left = this.insertItem(value, node.left);
        }
        else if (node.data < value) {
            node.right = this.insertItem(value, node.right);
        }

        return node;
    }

    deleteItem(value, node) {

        if (node === null) {
            return node;
        }

        if (node.data > value) {
            node.left = this.deleteItem(value, node.left);
        }
        else if (node.data < value) {
            node.right = this.deleteItem(value, node.right)
        }
        else {
            if (node.data === value) {
                if (node.left && node.right) {
                    const temp = node.left;
                    node = this.findSuccessor(node.right);
                    node.left = temp;
                    return node;
                }
                else if (node.left) {
                    node.data = node.left.data;
                    node.left = null;
                    return node;
                }
                else if (node.right) {
                    node.data = node.right.data;
                    node.right = null;
                    return node;
                }
                else {
                    node = null;
                    return node;
                }
            }
        }
    }

    findSuccessor(node) {
        if (node.left) {
            return this.findSuccessor(node.left);
        }
        else {
            return node;
        }
    }

    findNode(value, node) {
        if (node.data === value) {
            return node;
        }
        else if (node.data > value) {
            return this.findNode(value, node.left);
        }
        else if (node.data < value) {
            return this.findNode(value, node.right);
        }
        return false;
    }

    levelOrder(node, callback) {
        if (!callback) {
            throw new Error('no callback function provided');
        }
        callback(node);
    }

    inOrder(node, callback) {
        if (!callback) {
            throw new Error('no callback function provided');
        }
        callback(node);
    }

    preOrder(node, callback) {
        if (!callback) {
            throw new Error('no callback function provided');
        }
        callback(node);
    }

    postOrder(node, callback) {
        if (!callback) {
            throw new Error('no callback function provided');
        }
        callback(node);
    }
}

function outputLevelOrder(node) {
    if (node === null) {
        return;
    }
    let arr = [];
    arr.push(node);

    while (arr.length > 0) {
        const shifted = arr.shift();
        console.log(`${shifted.data} `);
        if (shifted.left) {
            arr.push(shifted.left);
        }
        if (shifted.right) {
            arr.push(shifted.right);
        }
    }
}

function outputInOrder(node) {
    if (node === null) {
        return;
    }
    if (node.left) {
        outputInOrder(node.left);
    }
    console.log(`${node.data} `);
    if (node.right) {
        outputInOrder(node.right);
    }
}

function outputPostOrder(node) {
    if (node === null) {
        return;
    }
    if (node.left) {
        outputPostOrder(node.left);
    }
    if (node.right) {
        outputPostOrder(node.right);
    }
    console.log(`${node.data} `);
}

function outputPreOrder(node) {
    if (node === null) {
        return;
    }
    console.log(`${node.data} `);
    if (node.left) {
        outputPreOrder(node.left);
    }
    if (node.right) {
        outputPreOrder(node.right);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const dollarTree = new Tree(arr);
let nodes = dollarTree.buildTree(arr, 0, arr.length - 1);
prettyPrint(nodes);
nodes = dollarTree.insertItem(1000, nodes);
prettyPrint(nodes);
nodes = dollarTree.insertItem(500, nodes);
prettyPrint(nodes);
dollarTree.deleteItem(4, nodes);
prettyPrint(nodes);
const node = dollarTree.findNode(5, nodes);
dollarTree.levelOrder(nodes, outputLevelOrder);
dollarTree.inOrder(nodes, outputInOrder);
dollarTree.preOrder(nodes, outputPreOrder);
dollarTree.postOrder(nodes, outputPostOrder);