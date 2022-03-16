const { connectDb } = require('./src/dbConnect');
const quesitonSet = require('./questionSet.json');

// array of json questions

const uploadQuestion = (question) => {
 // write the question to the database;

 const db = connectDb();
  db.collection("questions")
    .add(question)
    
    .then((doc) => {
    console.log(doc.id)  
    })
    .catch((err) =>
    console.log(err));
  }

const run = async () => {
    for(const question of quesitonSet) {
        await uploadQuestion(question);
    }
}

console.log(quesitonSet)

run()