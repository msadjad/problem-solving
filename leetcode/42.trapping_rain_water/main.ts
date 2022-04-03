function trap(height: number[]): number {
  let left = -1;
  for (let i = 0; i < height.length; i++) {
    if (i < height.length - 1 && height[i] > height[i + 1]) {
      left = i;
      break;
    }
  }

  let right = height.length;

  for (let i = height.length - 1; i >= 0; i--) {
    if (i > 1 && height[i] > height[i - 1]) {
      right = i;
      break;
    }
  }


  if (left === -1 || right === height.length) {
    return 0;
  }

  return capturedWater(height, left, right);
}

function capturedWater(heights: number[], left: number, right: number): number {
  if (left === right) {
    return 0;
  }

  let max = -1;
  let maxIndex = left;
  let secondMax = -1;
  let secondMaxIndex = right;

  for (let i = left; i <= right; i++) {
    if (max < heights[i]) {
      max = heights[i];
      maxIndex = i;
    }
  }

  for (let i = left; i <= right; i++) {
    if (secondMax < heights[i] && i != maxIndex) {
      secondMax = heights[i];
      secondMaxIndex = i;
    }
  }


  const leftMaximumIndex =
    maxIndex < secondMaxIndex ? maxIndex : secondMaxIndex;
  const rightMaximumIndex =
    maxIndex < secondMaxIndex ? secondMaxIndex : maxIndex;


  let waterTrapped = 0;
  for (let i = leftMaximumIndex; i <= rightMaximumIndex; i++) {
    waterTrapped += Math.max(secondMax - heights[i], 0);
  }

  return (
    waterTrapped +
    capturedWater(heights, left, leftMaximumIndex) +
    capturedWater(heights, rightMaximumIndex, right)
  );
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) === 6);
console.log(trap([4, 2, 0, 3, 2, 5]) === 9);
console.log(trap([0, 1, 0]) === 0);
console.log(trap([1, 1]) === 0);
console.log(trap([0]) === 0);
