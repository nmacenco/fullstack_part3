// const mongoose = require("mongoose");

// const password = process.argv[2];
// if (password === undefined) {
//   console.log(
//     "Please provide the password as an argument: node mongo.js <password>"
//   );
//   process.exit(1);
// }
// // DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = `mongodb+srv://fullstack:${password}@cluster0.p7gqjr1.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// const Person = mongoose.model("Person", personSchema);

// if (process.argv.length === 3) {
//   Person.find({}).then((result) => {
//     console.log("Phonebook:");
//     result.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close();
//   });
// } else {
//   const name = process.argv[3];
//   const number = process.argv[4];
//   const person = new Person({
//     name,
//     number,
//   });

//   person.save().then((result) => {
//     console.log(`added ${name} number ${number} to phonebook`);
//     mongoose.connection.close();
//   });
// }
