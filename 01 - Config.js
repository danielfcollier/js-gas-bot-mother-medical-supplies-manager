// *****************************************************************************************
// >>> Configurations
// *****************************************************************************************
class Son {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

const son01 = new Son("Daniel", "danielfcollier@gmail.com");
const son02 = new Son("André", "andrecollier@gmail.com");

const sons = [son01, son02];

const sheetName = "Remédios";
const sheetRange = "A2:H";

const MINIUM_DESIRED_DAYS_LEFT = 10;
// *****************************************************************************************