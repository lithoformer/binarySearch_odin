import { Tree, outputInOrder, outputLevelOrder, outputPostOrder, outputPreOrder, prettyPrint } from "./app.js"

let length = 15;
let max = 100;
let arr = [];

for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * max));
}

const myTree = new Tree(arr);
let root = myTree.buildTree(arr, 0, arr.length - 1);

console.log(`the tree is balanced: ${myTree.isBalanced(root)}`);

myTree.levelOrder(root, outputLevelOrder);
myTree.preOrder(root, outputPreOrder);
myTree.postOrder(root, outputPostOrder);
myTree.inOrder(root, outputInOrder);

myTree.insertItem(150, root);
myTree.insertItem(125, root);
myTree.insertItem(117, root);
myTree.insertItem(200, root);
myTree.insertItem(250, root);

console.log(`the tree is balanced: ${myTree.isBalanced(root)}`);

prettyPrint(root);

let newRoot = myTree.reBalance(arr = [], root);

prettyPrint(newRoot);

console.log(`the tree is balanced: ${myTree.isBalanced(newRoot)}`);

myTree.levelOrder(newRoot, outputLevelOrder);
myTree.preOrder(newRoot, outputPreOrder);
myTree.postOrder(newRoot, outputPostOrder);
myTree.inOrder(newRoot, outputInOrder);