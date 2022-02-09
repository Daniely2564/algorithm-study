function intervalSort(a: number[], b: number[]) {
  if (a[0] !== b[0]) {
    return a[0] - b[0];
  } else {
    return a[1] - b[1];
  }
}

function merge(intervals: number[][]): number[][] {
  intervals.sort(intervalSort);
  let result = [];
  let start = intervals[0][0];
  let end = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    const [first, second] = intervals[i];
    if (end >= first) {
      end = Math.max(second, end);
    } else {
      result.push([start, end]);
      start = first;
      end = second;
    }
  }
  const resultNotAdded =
    result.length === 0 || result[result.length - 1][0] != start;
  if (resultNotAdded) {
    result.push([start, end]);
  }

  return result;
}
