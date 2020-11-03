class Programmer2 {
    constructor() {
        this.languages = [];
    }

    static makeProgrammer() {
        return new Programmer2();
    }

    learnNewLanguage(language) {
        this.languages.push(language);
    }

    isPragmatic() {
        return this.languages.length > 2;
    }
}

// Programmer2.makeProgrammer();
const programmer2 = new Programmer2();
programmer2.learnNewLanguage('Java');
programmer2.learnNewLanguage('Ruby');
console.log(programmer2.isPragmatic()); // false
programmer2.learnNewLanguage('Python');
console.log(programmer2.isPragmatic()); // true

['Java', 'Ruby', 'Python'].forEach(programmer2.learnNewLanguage);