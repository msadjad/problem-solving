class NumberContainers {
    private values: Map<number, number>;
    private indexes: Map<number, MinHeap>;
    constructor() {
        this.values = new Map<number, number>();
        this.indexes = new Map<number, MinHeap>();
    }

    change(index: number, value: number): void {
        this.values.set(index, value);
        const indexes = this.indexes.get(value) ?? new MinHeap;
        indexes.insert(index);
        this.indexes.set(value, indexes);
    }

    find(value: number): number {
        const indexes = this.indexes.get(value) ?? new MinHeap;

        let minIndex = indexes.peek();
        let currentValue = this.values.get(minIndex);

        while(minIndex != null && currentValue != value) {
            indexes.extractMin();
            minIndex = indexes.peek();
            currentValue = this.values.get(minIndex);
        }

        if(minIndex === null) {
            return -1;
        }

        return indexes.peek();
    }
}

/**
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */
class MinHeap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  insert(value: number): void {
    this.heap.push(value);
    this.heapifyUp();
  }

  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin(): number | null {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();
    return min;
  }

  private heapifyDown(): void {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index] > this.heap[smallerChildIndex]) {
        this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
      } else {
        break;
      }
    }
  }

  peek(): number | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size(): number {
    return this.heap.length;
  }
}
