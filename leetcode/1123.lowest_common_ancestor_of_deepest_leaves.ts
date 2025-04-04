/**
 * Definition for a binary tree node.
 * class TreeNode {
 * val: number
 * left: TreeNode | null
 * right: TreeNode | null
 * constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 * this.val = (val===undefined ? 0 : val)
 * this.left = (left===undefined ? null : left)
 * this.right = (right===undefined ? null : right)
 * }
 * }
 */

type ExtendedNode = {
    left: ExtendedNode | null,
    right: ExtendedNode | null,
    parent: ExtendedNode | null,
    node: TreeNode | null,
    depth: number,
};

function convertToExtendedTreeNode(root: TreeNode | null, depth: number, parent: ExtendedNode | null): ExtendedNode | null {
    if(root === null) {
        return null;
    }

    const extendedNode: ExtendedNode = {
        depth,
        node: root,
        parent,
        left: null,
        right: null,
    };

    extendedNode.left = convertToExtendedTreeNode(root.left, depth + 1, extendedNode);
    extendedNode.right = convertToExtendedTreeNode(root.right, depth + 1, extendedNode);

    return extendedNode;
}


function getDeepestNodes(root: ExtendedNode | null, currentMaxDepth: number, nodes: Set<ExtendedNode>): {nodes: Set<ExtendedNode>, depth: number} {
    if(root === null) {
        return {nodes, depth: currentMaxDepth};
    }

    let maxDepth = currentMaxDepth;
    let deepestNodes = nodes;

    if (root.depth > maxDepth) {
        maxDepth = root.depth;
        deepestNodes = new Set<ExtendedNode>();
        deepestNodes.add(root);
    } else if (root.depth === maxDepth) {
        deepestNodes.add(root);
    }

    const leftResult = getDeepestNodes(root.left, maxDepth, deepestNodes);
    if (leftResult.depth > maxDepth) {
        maxDepth = leftResult.depth;
        deepestNodes = leftResult.nodes;
    } else if (leftResult.depth === maxDepth) {
        leftResult.nodes.forEach(node => deepestNodes.add(node));
    }

    const rightResult = getDeepestNodes(root.right, maxDepth, deepestNodes);
    if (rightResult.depth > maxDepth) {
        maxDepth = rightResult.depth;
        deepestNodes = rightResult.nodes;
    } else if (rightResult.depth === maxDepth) {
        rightResult.nodes.forEach(node => deepestNodes.add(node));
    }

    return { nodes: deepestNodes, depth: maxDepth };
}

function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
    if (!root) {
        return null;
    }

    const extendedRoot = convertToExtendedTreeNode(root, 0, null);
    if (!extendedRoot) return null;

    const deepestResult = getDeepestNodes(extendedRoot, -1, new Set<ExtendedNode>());
    let currentNodes = deepestResult.nodes;

    if (currentNodes.size <= 1) {
        const firstNode = currentNodes.values().next().value;
        return firstNode ? firstNode.node : null;
    }

    while (currentNodes.size > 1) {
        const parents = new Set<ExtendedNode>();
        for (const node of currentNodes) {
            if (node.parent) {
                parents.add(node.parent);
            }
        }
        currentNodes = parents;
    }

    const lcaExtendedNode = currentNodes.values().next().value;
    return lcaExtendedNode ? lcaExtendedNode.node : null;
};
