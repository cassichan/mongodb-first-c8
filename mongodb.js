import { MongoClient, ObjectId } from "mongodb";
import { uri, otherSecret } from "./credentials.js";

const client = new MongoClient(uri);
const db = client.db("sample_mflix");
const moviesCollection = db.collection("movies");

// console.log(await moviesCollection.findOne({})) //finds one movie

//finds movies by title
let query = { title: { $regex: /terminator/i } }; //search for "terminator" anywhere in the title and ignore case
let movieArray = await moviesCollection.find(query).limit(3).toArray();
for (let i = 0; i < movieArray.length; i++) {
  console.log(movieArray[i].title);
}
let firstMovie = movieArray[0];
console.log(firstMovie.title);

//adding movie
const newMovie = {
  title: "The Boca Code Story",
  rating: "R",
  genre: ["Comedy"],
  releaseDate: "2022/12/16",
};

const updateQuery = { _id: new ObjectId("6345ca3e5b09d30640d71df1") };
const update = { $set: { title: "the NEW Boca Code Story" } };
const results = await moviesCollection.findOneAndUpdate(updateQuery, update);
console.log(results);

// const results = await moviesCollection.insertOne(newMovie)
// console.log("results of insert", results)

// db.close();
