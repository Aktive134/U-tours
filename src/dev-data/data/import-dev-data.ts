import Configuration from '../../config';
import dotenv from 'dotenv';
import fs from 'fs';
import Tour from '../../features/tours/tours.model';
import mongoose from 'mongoose';

//This is a script file that was used to seed data into the database using the CLI
//without manually posting them.

dotenv.config();
mongoose
  .connect(Configuration.Database.url)
  .then(() => {
    console.log('connected to mongoDb');
  })
  .catch((err) => {
    console.error('could not connect to mongoDb\n', err);
  });

//Read the file
const tours = JSON.parse(
  fs.readFileSync(`src/dev-data/data/tours-simple.json`, 'utf-8')
);

//Function to import data to DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//Function to delete data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
} catch (error) {
    console.log(error);
}
    process.exit();
};

if(process.argv[2] === '--import'){
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

// node dist/dev-data/data/import-dev-data.js --import