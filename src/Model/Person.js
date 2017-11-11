export default class Person {

    constructor(personId, name) {
        this.personId = personId;
        this.name = name;
    }

    get getId() {
        return this.personId;
    }

    get getName() {
        return this.name;
    }

    set setId(personId) {
        this.personId = personId;
    }

    set setName(name) {
        this.name = name;
    }

    validatePerson() {
        if (!this.personId || !this.name) {
            return false;
        } else if (!((this.personId.toString().length > 0 && this.personId.toString().length <= 10) && (this.personId.toString().length > 0 && this.personId.toString().length <= 10))) {
            return false;
        } else {
            return true;
        }
    }

    personToString() {
        return ({ "personId": this.personId, "name": this.name });
    }
}