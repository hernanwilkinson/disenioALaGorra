
export class ALaGorraSystem {
    getCustomersAgenda() {
        this.shouldBeImplementedBySubclass();
    }

    getSalesBook() {
        this.shouldBeImplementedBySubclass();
    }

    shouldBeImplementedBySubclass() {
        throw new Error("Should be implemented by subclass");
    }
}