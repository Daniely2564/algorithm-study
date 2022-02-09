class LinkNode<T> {
  key: number;
  val: T;
  prev: LinkNode<T>;
  next: LinkNode<T>;
}

class LRUCache {
  private size: number;
  private capacity: number;
  private head: LinkNode<number>;
  private tail: LinkNode<number>;
  private cache: Map<number, LinkNode<number>>;

  constructor(capacity: number) {
    this.size = 0;
    this.capacity = capacity;
    this.cache = new Map();
    this._init_();
  }

  private _init_() {
    this.head = new LinkNode<number>();
    this.tail = new LinkNode<number>();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private addNodeToHead(node: LinkNode<number>) {
    const nodeAfterHead = this.head.next;
    this.head.next = node;
    nodeAfterHead.prev = node;

    node.prev = this.head;
    node.next = nodeAfterHead;
  }

  private removeNode(node: LinkNode<number>) {
    const prev = node.prev;
    const next = node.next;

    prev.next = next;
    next.prev = prev;

    return node;
  }

  private removeTheLastNode() {
    if (this.size === 0) return null;

    const nodeBeforeTail = this.tail.prev;

    nodeBeforeTail.prev.next = this.tail;
    this.tail.prev = nodeBeforeTail.prev;

    nodeBeforeTail.next = null;
    nodeBeforeTail.prev = null;

    return nodeBeforeTail;
  }

  get(key: number): number {
    if (this.cache.get(key)) {
      const latestNode = this.cache.get(key);
      this.removeNode(latestNode);
      this.addNodeToHead(latestNode);
      return latestNode.val;
    } else {
      return -1;
    }
  }

  put(key: number, value: number): void {
    if (this.cache.get(key)) {
      const nodeFound = this.cache.get(key);
      nodeFound.val = value;
      this.removeNode(nodeFound);
      this.addNodeToHead(nodeFound);
    } else {
      this.size++;
      const newNode = new LinkNode<number>();
      newNode.key = key;
      newNode.val = value;
      this.addNodeToHead(newNode);
      this.cache.set(key, newNode);
      if (this.size > this.capacity) {
        const lastNode = this.removeTheLastNode();
        this.cache.delete(lastNode.key);
        this.size--;
      }
    }
  }
}

export default LRUCache;
