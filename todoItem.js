class todoItem {
    constructor(content, status, id) {
        this.content = content;
        this.status = status;
        this.id = id;
    }

    done() {
        return this.status = true;
    }
    undone() {
        return this.status = false;
    }
}