//Command-line Dictionary

// add words and definitions
// Group words by their letter
// Look up all words that start with a letter
// Look up a word and get back the definition
// Edit an entry
// Delete an entry
// Sort by alphabetical order
// Display a random definition

const readlineSync = require('readline-Sync')

class Dictionary {
  constructor (name, edition) {
    this.dictName = name;
    this.edition = edition;
    this.defs = { "a":{},
                  "b":{},
                  "c":{
                    cantor: "very jewish singer",
                    cells: "dummy data",
                    cigar: "more dummy data"
                  },
                  "d":{},
                  "e":{},
                  "f":{},
                  "g":{
                    gant: "kant with g",
                    gells: "lots of gell",
                    giger: "gigs and gigs"
                  },
                  "h":{},
                  "i":{},
                  "j":{},
                  "k":{},
                  "l":{},
                  "m":{},
                  "n":{},
                  "o":{},
                  "p":{},
                  "q":{},
                  "r":{},
                  "s":{},
                  "t":{},
                  "u":{},
                  "v":{},
                  "w":{},
                  "x":{},
                  "y":{},
                  "z":{}
                }
  }

  controller() {
    let num = readlineSync.question(
      `Rinat's Dictionary here. What would you like to do?

      1. 📝  Create a new Entry
      2. 🔦  Look up a word
      3. ✂️   Edit an existing Entry
      4. 🚽  Delete an Entry
      5. 🗃   Display all existing entries
      6. 🗂   Display all entries by letter
      7. 🎁  Display a random definition

      Type in a number between 1 to 7, or type exit: `)
      console.clear();
    switch (num) {
      case "1":
        console.log(`1. 📝  Create a new Entry`);
        let word = readlineSync.question(`Enter Word: `);
        let def = readlineSync.question(`Enter Definition: `)
          // can re-assign word = question...
        this.addEntry(word, def);
        break;
      case "2":
        console.log(`2. 🔦  Look up a word`);
        let nword = readlineSync.question(`Enter Word: `);
        this.displayDef(nword);
        break;
      case "3":
        console.log(`3. ✂️  Edit an existing Entry`);
        let eword = readlineSync.question(`Enter entry to edit: `);
        this.edit(eword);
        break;
      case "4":
        console.log(`4. 🚽  Delete an Entry`);
        let dword = readlineSync.question(`Type the word you wish to delete, and hit enter to delete it: `);
        this.deleteDef(dword);
        break;
      case "5":
        this.displayAll();
        break;
      case "6":
        console.log(`🗂  Display all entries by letter`);
        let l = readlineSync.question(`Type the letter you wish to display: `);
        this.displayForLetter(l);
        break;
      case "7":
        this.displayRandom();
        break;
      case "exit":
        break;
      default:
        console.log(`⛔  Invalid input. Try Again`)
        this.controller();
    }
  }

  addEntry(word, def) {
    word = word.toLowerCase();
    let firstLetter = word.charAt(0); //clearer to write firstLetter
    if (this.defs[firstLetter][word]) {
      console.log(`⛔  Entry already exists:\n" Word: ${word}\n Definition: ${this.defs[firstLetter][word]}"\n`);
      console.log(`To edit an entry, choose Edit option on main menu.`);
      this.backtoCont();
    } else {
      this.defs[firstLetter][word] = def;
      console.log(`Word: ${word}\nDefinition: ${this.defs[firstLetter][word]}\n CREATED!✅`);
      this.sortALetter(firstLetter);
      this.backtoCont();
    }
  }

  displayDef(nword) {
    nword = nword.toLowerCase();
    let fl = nword.charAt(0);
    console.log(`Word: ${nword}\nDefinition: ${this.defs[fl][nword]}`);
    this.backtoCont();
  }

  edit(eword) {
    eword = eword.toLowerCase();
    let fl = eword.charAt(0);
    console.log(`Word: ${eword}\nCurrent Definition: ${this.defs[fl][eword]}`);
    let def = readlineSync.question(`Enter New Definition: `)
    this.defs[fl][eword] = def;
    console.log(`Word: ${eword}\nUpdated Definition: ${this.defs[fl][eword]}\n UPDATED!✅`);
    this.sortALetter(fl);
    this.backtoCont();
  }

  deleteDef(dword) {
    dword = dword.toLowerCase();
    let fl = dword.charAt(0);
    if (this.defs[fl][dword] === undefined) {
      console.log(`⛔  The entry: "${dword}" does not exist.`);
      this.backtoCont();
    } else {
      console.log(`Word: ${dword}\nDefinition: ${this.defs[fl][dword]}\n DELETED!❌`);
      delete this.defs[fl][dword];
      this.backtoCont();
    }
  }

  displayAll() {
    // console.log(this.defs);
    for(let key in this.defs) {
      if (Object.keys(this.defs[key]).length) {
      console.log(`\n ${key.toUpperCase()}`);
      console.table(this.defs[key]); //look into it
      }
    };
    let entriesNum = 0;
    for(let key in this.defs) {
      if (Object.keys(this.defs[key]).length) {
        entriesNum += Object.keys(this.defs[key]).length;
      }
    };
    console.log(`\n📚  Total Number of Entries: ${entriesNum}\n`)
    this.backtoCont();
  }

  displayForLetter(fl) {
    fl = fl.toLowerCase();
    console.log(fl.toUpperCase());
    for(let key in this.defs[fl]){
      console.log(`${key}: ${this.defs[fl][key]}`)
    };
    if (this.defs[fl] === undefined) {
      console.log(`⛔  Invalid input, character not qualified as an entry...`);
    } else if (!Object.keys(this.defs[fl]).length) {
      console.log(`⛔  No entries for this letter...`);
    }
    this.backtoCont();
  }

  displayRandom() {
    let entriesArr = []; //new array with keys to all definitions.
    for(let letter in this.defs) {
      if (Object.keys(this.defs[letter]).length) {
        Object.keys(this.defs[letter]).forEach( word => {
          entriesArr.push(word);
        })
      }
    };

    let randomIdx = Math.floor(Math.random()*entriesArr.length);
    let randomKey = entriesArr[randomIdx];

    console.log(`🎁  Your random word and definition:\n\n${randomKey}: ${this.defs[randomKey.charAt(0)][randomKey]}\n`)
    this.backtoCont();
  }

  backtoCont() {
    let nword = readlineSync.question(`Go Back to main menu? y/n `);
    switch (nword) {
      case "y":
        console.clear();
        this.controller();
      break;
        case "n":
        break;
      default:
        console.log(`⛔  Invalid input. Try Again`)
        this.backtoCont();
      }
    }

  sortALetter(fl) {
    let temp = {}; //leave a comment for upcase / lower case -common pattern
    let arr = Object.keys(this.defs[fl]).sort();

    arr.forEach(key => {
        temp[key] = this.defs[fl][key];
      });

    this.defs[fl] = temp; //assignment
    }

}

let newDict = new Dictionary("The Greatest Dictionary","2018");

newDict.controller()
