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

class FindElements {
    private numbers: Set<number>;

    constructor(root: TreeNode | null) {
        this.numbers = new Set<number>();
        const stack: TreeNode[] = [];

        if(root != null) {
            root.val = 0;
            this.numbers.add(0);
            stack.push(root);    
        }

        while(stack.length > 0) {
            const node = stack.pop();

            if(node.left != null) {
                node.left.val = node.val * 2 + 1;
                this.numbers.add(node.left.val);
                stack.push(node.left);
            }
            if(node.right != null) {
                node.right.val = node.val * 2 + 2;
                this.numbers.add(node.right.val);
                stack.push(node.right);
            }
        }
    }

    find(target: number): boolean {
        return this.numbers.has(target)
    }
}

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */