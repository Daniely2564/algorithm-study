class LinkNode<T> {
  public key: number;
  public value: T;
  public prev: LinkNode<T>;
  public next: LinkNode<T>;
}

class LRUCache {
  cache: Map<number, LinkNode<number>>;
  head: LinkNode<number>;
  tail: LinkNode<number>;
  size: number;
  capacity: number;

  constructor(capacity: number) {
    this.size = 0;
    this.capacity = capacity;

    this.head = new LinkNode<number>();
    this.tail = new LinkNode<number>();
    this.cache = new Map();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addNode(node: LinkNode<number>) {
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node: LinkNode<number>) {
    const prev = node.prev;
    const next = node.next;

    prev.next = next;
    next.prev = prev;
  }

  moveToHead(node: LinkNode<number>) {
    this.removeNode(node);
    this.addNode(node);
  }

  popTail() {
    const removedNode = this.tail.prev;
    this.removeNode(this.tail);
    return removedNode;
  }

  get(key: number) {
    const node = this.cache.get(key);
    if (node == null) return -1;
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number) {
    const node = this.cache.get(key);

    if (node === undefined) {
      const newNode = new LinkNode<number>();
      newNode.key = key;
      newNode.value = value;

      this.cache.set(key, newNode);
      this.addNode(newNode);

      this.size++;

      if (this.size > this.capacity) {
        // pop the tail
        const tail = this.popTail();
        this.cache.delete(tail.key);
        this.size--;
      }
    } else {
      // update the value.
      node.value = value;
      this.moveToHead(node);
    }
  }
}

export default LRUCache;
