class utilsReport {

    static elements = new Set();

    static addElement(element) {
        this.elements.add(element);
    }

    static removeElement(element) {
        this.elements.delete(element);
    }
} export default utilsReport;