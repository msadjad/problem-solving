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

type NodeDepth = {
    value: number,
    depth: number;
}

function recoverFromPreorder(traversal: string): TreeNode | null {
    const depthArray = convertToDepthArray(traversal);
    return convertToTree(depthArray);
};

function convertToTree(depthArray: NodeDepth[]): TreeNode | null {
    const nodeStack: [TreeNode, number][] = [];
    const root: TreeNode = new TreeNode(depthArray[0].value);
    nodeStack.push([root, 0]);

    for(let i=1 ; i<depthArray.length ; i++) {
        let currentNode = nodeStack[nodeStack.length - 1];
        const newNode = new TreeNode(depthArray[i].value);

        while(depthArray[i].depth != currentNode[1] + 1) {
            currentNode = nodeStack.pop();
        }

        if(currentNode[0].left === null) {
            currentNode[0].left = newNode;
        } else {
            currentNode[0].right = newNode;
        }
        nodeStack.push([newNode, depthArray[i].depth]);
    }

    return root;
}

function convertToDepthArray(traversal: string): NodeDepth[] {
    const depthArray: NodeDepth[] = [];
    const traversalSplitted = traversal.split('-');
    depthArray.push({
        value: parseInt(traversalSplitted[0]),
        depth: 0
    });

    for(let i=1 ; i<traversalSplitted.length ; i++) {
        let depth = 1;
        while(traversalSplitted[i] === '') {
            i++;
            depth++;
        }
        depthArray.push({
            value: parseInt(traversalSplitted[i]),
            depth,
        })
    }

    return depthArray;
}
