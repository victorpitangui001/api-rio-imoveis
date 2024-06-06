const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb+srv://root:78930100@rioimoveis-01.gneb6ib.mongodb.net/testedb?retryWrites=true&w=majority&appName=rioimoveis-01');
  console.log('Conectou ao Mongoose!');
}

main().catch((err) => console.log(err));

module.exports = mongoose;
