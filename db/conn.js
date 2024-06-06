const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECT_URI);
  console.log('Conectou ao Mongoose!');
}

main().catch((err) => console.log(err));

module.exports = mongoose;
