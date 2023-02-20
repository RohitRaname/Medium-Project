const mongoose = require('mongoose');


const connectToDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGOOSE_DB_LOCAL)
      .then(() => console.log('db succesfully connected'));
  } catch (err) {
    console.log('mongoose err', err);
    throw err;
  }
};

module.exports = connectToDB;
        