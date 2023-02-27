const People = require("./models/people");
const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://admin0:${password}@cluster0.ewcbwvv.mongodb.net/phonebook`;

mongoose.set("strictQuery", true);
mongoose.connect(url);

const showAllEntries = async () => {
  const people = await People.find({});
  console.log(people);
};

const createNewEntry = async (name, number) => {
  const newEntry = await People.create({ name, number });
  const people = await newEntry.save();

  console.log(`Added ${people.name} number ${people.number} to phonebook`);
};

if (!name || !number) {
  // is password is the only parameter given then show all the entries in the db
  showAllEntries();
} else {
  // add entry into the db

  createNewEntry(name, number);
}
