// Bands and Musicians in those bands
class Musician {
  constructor(name, instrument) {
    this.name = name;
    this.instrument = instrument;
  }

  describe() {
    //console.log(`${this.name} plays ${this.instrument}`)
    return `${this.name} plays ${this.instrument}`;
  }
}

class Band {
  constructor(name) {
    this.name = name;
    this.musicians = [];
  }

// Function to add a musician to a band, otherwise throws error
  addMusician(musician) {
    if (musician instanceof Musician) {
      this.musicians.push(musician);
    } else {
      throw new Error(`You can only add an instance of Musician. 
  Your argument is not a musician: ${musician}`);
    }
  }

  describe() {
    return `${this.name} has ${this.musicians.length} musicians.`;
  }
}

// Create the menu class and choices for user
class Menu {
  constructor() {
    this.bands = [];
    this.selectedBand = null; // manage one band at a time
  }

  start() { // entry point to application
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case '1':
          this.createBand();
          break;
        case '2':
          this.viewBand();
          break;
        case '3':
          this.deleteBand();
          break;
        case '4':
          this.displayBands();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert('Goodbye dude!');
  }

 // Function to show main menu options
  showMainMenuOptions() {
    return prompt(`
  0) Exit
  1) Create a New Band
  2) View a Band
  3) Delete a Band
  4) Display All Bands
  `);
  }

  // Function to show band menu options
  showBandMenuOptions(bandInfo) {
    return prompt(`
  0) Back
  1) Add a New Musician
  2) Delete a Musician
  -----------------
  ${bandInfo}
  `);
  }

  // Loop through the bands array and alert with a string
  displayBands() {
    let bandString = '';
    for (let i = 0; i < this.bands.length; i++) {
      bandString += i + ') ' + this.bands[i].name + '\n';
    }
    alert(bandString);
  }

  // Function to create a band
  createBand() {
    let name = prompt('Enter name for new band: ');
    this.bands.push(new Band(name));
  }

  // Function to view a band and prompt user to enter their index
  viewBand() {
    let index = prompt("Enter the index of the band that you want to view:");

    // Loop throw the band array to display band name
    if (index > -1 && index < this.bands.length) {
      this.selectedBand = this.bands[index];
      let description = 'Band Name: ' + this.selectedBand.name + '\n';
      description += ' ' + this.selectedBand.describe() + '\n ';
      for (let i = 0; i < this.selectedBand.musicians.length; i++) {
        // description += i + ') ' + this.selectedBand.musicians[i].name + ' - '
        // + this.selectedBand.musicians[i].instrument + '\n';
        description += i + ') ' + this.selectedBand.musicians[i].describe() + '\n';
      }
      let selection1 = this.showBandMenuOptions(description);
      switch (selection1) {
        case '1':
          this.createMusician();
          break;
        case '2':
          this.deleteMusician();
      }
    } // validate user input
  }

  // Function to delete a band
  deleteBand() {
    let index = prompt('Enter the index of the band that you wish to delete: ');
    if (index > -1 && index < this.bands.length) {
      this.bands.splice(index, 1);
    }
  }

  // Function to create a musician and their instrument
  createMusician() {
    let name = prompt('Enter name for new musician: ');
    let instrument = prompt('Enter instrument for new musician: ');
    //this.selectedBand.musicians.push(new Musician(name, instrument));
    this.selectedBand.addMusician(new Musician(name, instrument));
  }

  // Function to delete a musician
  deleteMusician() {
    let index = prompt('Enter the index of the musician that you wish to delete: ');
    if (index > -1 && index < this.selectedBand.musicians.length) {
      this.selectedBand.musicians.splice(index, 1);
    }
  }
}

// Declare the menu variable and start the menu
let menu = new Menu();
menu.start();