function trap(height: number[]): number {
  let sum = 0;
  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      const trapped = Math.max(leftMax - height[left], 0);
      sum += trapped;
      leftMax = Math.max(leftMax, height[left]);
      left++;
    } else {
      const trapped = Math.max(rightMax - height[right], 0);
      sum += trapped;
      rightMax = Math.max(rightMax, height[right]);
      right--;
    }
  }
  return sum;
}
