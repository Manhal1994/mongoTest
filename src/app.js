const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";

const dbname = "sefdb";

mongoClient.connect(connectionUrl, (error, res1) => {
  if (error) {
    return console.log("error could not connect");
  }
  console.log("connected Successfully");

  const db = res1.db(dbname);

  //------------------Insert One----------------------

  db.collection("users").insertOne(
    {
      name: "Sami",
      age: 28,
    },
    (error, data) => {
      if (error) {
        console.log("Something went wrong");
      }
      console.log(data.insertedId);
    }
  );

  //------------------Insert Many----------------------
  db.collection("users").insertMany(
    [
      {
        name: "zed",
        age: 51,
      },
      {
        name: "omar",
        age: 20,
      },
      {
        name: "abd",
        age: 30,
      },
    ],
    (error, data) => {
      if (error) {
        console.log("Unable to insert data");
      }
    }
  );

  // Find one
  findOne(query, options, callback);

  db.collection("users").findOne(
    { _id: mongodb.ObjectId("65f9a11d85fb343b5c4548cb") },
    (error, user) => {
      if (error) {
        console.log("Unable to insert data");
      }
      console.log(user);
    }
  );
  // Select age 30
  db.collection("users")
    .find({ age: 30 })
    .limit(3)
    .toArray((error, users) => {
      if (error) {
        return console.log("Error has occurred");
      }
      console.log(users);
    });

  // count users with age 30
  db.collection("users")
    .find({ age: 30 })
    .limit(3)
    .count((error, users) => {
      if (error) {
        return console.log("Error has occurred");
      }
      console.log(users);
    });
});
