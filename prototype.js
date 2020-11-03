function Programmer1() {
    this.languages = [];
    // return this;
}

Programmer1.prototype.learnNewLanguage = function(lang) {
    this.languages.push(lang);
}

Programmer1.prototype.isPragmatic = function() {
    return this.languages.length > 2;
}

const programmer1 = new Programmer1();
programmer1.learnNewLanguage('Java');
programmer1.learnNewLanguage('Ruby');
console.log(programmer1.isPragmatic()); // false
programmer1.learnNewLanguage('Python');
console.log(programmer1.isPragmatic()); // true

// const fn = programmer1.learnNewLanguage;
['Java', 'Ruby', 'Python'].forEach(programmer1.learnNewLanguage, programmer1);
//
// function fn() {
//     this.name;
// }
// const o = {fn};
// fn(); // undefined, global
// o.fn(); // o
// fn.call(programmer1) // o
// new fn() // some new object

