/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
    const numberOfNodes = preorder.length;
    const indexInPostorder = Array.from({ length: numberOfNodes + 1 }, () => -1);
    for (let i = 0; i < numberOfNodes; i++) {
        indexInPostorder[postorder[i]] = i;
    }

    return constructTree(0, numberOfNodes - 1, 0, preorder, indexInPostorder);
};

function constructTree(
    preStart: number,
    preEnd: number,
    postStart: number,
    preorder: number[],
    indexInPostorder: number[]
): TreeNode | null {
    if (preStart > preEnd) {
        return null;
    }

    if (preStart === preEnd) {
        return new TreeNode(preorder[preStart]);
    }

    const leftRoot = preorder[preStart + 1];
    const numberOfNodesInLeft = indexInPostorder[leftRoot] - postStart + 1;
    const root = new TreeNode(preorder[preStart]);
    root.left = constructTree(preStart + 1,
        preStart + numberOfNodesInLeft,
        postStart,
        preorder, indexInPostorder);
    root.right = constructTree(preStart + numberOfNodesInLeft + 1,
        preEnd,
        postStart + numberOfNodesInLeft,
        preorder,
        indexInPostorder);

    return root;
}
