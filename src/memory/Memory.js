class Memory {
    constructor() {
        this.store = {};
    }

   getItemsCount() {
        return Object.keys(this.store).length
    }

    get(id) {
        return this.store[id];
    }

    save(data) {
        const id = this.getItemsCount() + 1
        this.store[id] = data;

        return id
    }
}

module.exports = Memory