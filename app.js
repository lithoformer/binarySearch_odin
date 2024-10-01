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
        this.root = null;
    }

    buildTree(arr, start, end) {
        let array = arr.sort((a, b) => { return a - b });
        array = [...new Set(array)];

        if (end > arr.length) {
            end = arr.length - 1;
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
            return false;
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

                }
                else if (node.left) {
                    node.data = node.left.data;
                    node.left = null;
                }
                else if (node.right) {
                    node.data = node.right.data;
                    node.right = null;
                }
                else {
                    node = null;
                    return node;
                }
            }
        }
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