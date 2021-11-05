require("dotenv");
const SecretSanta = require("./index.js").SecretSanta;
const Santa = new SecretSanta(
  [
    { name: "Ania", email: "aniutka.pop@gmail.com" },
    { name: "Adam", email: "adamosca@gmail.com" },
  ],
  ["cats", "dogs"]
);

Santa.test();
console.log(process.env.EMAIL);
Santa.send(process.env.EMAIL, process.env.PASSWORD);
