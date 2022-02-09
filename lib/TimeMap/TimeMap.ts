class TimeMap {
  private map;
  constructor() {
    this.map = new Map();
  }

  set(key: string, value: string, timestamp: number): void {
    if (this.map.get(key)) {
      let arr = this.map.get(key);
      arr.push({ value, timestamp });
      arr.sort((a, b) => a.timestamp - b.timestamp);
    } else {
      this.map.set(key, [{ value, timestamp }]);
    }
  }

  get(key: string, timestamp: number): string {
    let arr = this.map.get(key);
    let idx = this.getLargestIdx(arr, timestamp);
    return arr[idx].value;
  }

  private getLargestIdx(arr, target): number {
    let start = 0,
      end = arr.length - 1;
    while (start < end) {
      let mid = Math.floor(start + (end - start) / 2);
      if (arr[mid].timestamp > target) {
        end = mid - 1;
      } else if (arr[mid].timestamp < target) {
        start = mid + 1;
      } else {
        return mid;
      }
    }
    return end > 0 ? end : 0;
  }
}
