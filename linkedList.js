// Creating a node
class Node {
    constructor(name, length, path) {
        this.musicNode = {
            name: name,
            length: length,
            path: path,
        };
        this.prev = null;
        this.next = null;
    }
}

// Creating linked list and pointer
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.tempPos = null;
    }

    // Push node to linked list
    push(name, length, path) {
        const newNode = new Node(name, length, path);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    // Set pointer to the head node
    setDefaultPointer() {
        this.tempPos = this.head;
    }

    // Traverse linked list
    traverse(direction) {
        if (direction === 1 && this.tempPos.next != null) {
            this.tempPos = this.tempPos.next;
            return this.tempPos.musicNode;
        } else if (direction === -1 && this.tempPos.prev != null) {
            this.tempPos = this.tempPos.prev;
            return this.tempPos.musicNode;
        } else {
            return null;
        }
    }

    // Get node position
    nodePosition() {
        if (this.tempPos.next == null) {
            return -1; // Last position
        } else if (this.tempPos.prev == null) {
            return 1; // First position
        } else {
            return 0; // Middle position
        }
    }
}
