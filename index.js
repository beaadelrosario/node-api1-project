const express = require("express");
const server = express();

server.use(express.json()); //needed for the POST and PUT

server.get("/", (req, res) => {
  res.status(200).json({ hello: "Bea Testing" });
});

let users = [
  {
    id: "1",
    name: "Jane Doe",
    bio: "She is my friend!",
  },
];

let nextId = 2;

server.get("/api/users", (req, res) => {
    if (!users) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
      } else {
        res.status(200).json({ data: users });
      }
});

server.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id -1);
    if(users[id]) { //If the user with the specified id
        res.status(200).json({data:users[id]});
    } else if (!users[id]) { // is not found:
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      } else { // If there's an error in retrieving the user from the database:
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
      }
});

server.post("/api/users", (req, res) => {
  const newUser = { 
      id: nextId++, 
      name: req.body.name, 
      bio: req.body.bio 
    };

  const newUserName = req.body.name; // read the info
  const newUserBio = req.body.bio;

  if(!newUserName || !newUserBio) { // If the request body is missing the name or bio property:
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  } else if(newUserName && newUserBio) {  // If the information about the user is valid:
    users.push(newUser);
    res.status(201).json({data:users});
  } else { // If there's an error while saving the user:
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  }
});

// server.delete("/api/users/:id", (req,res) => {
//     const id = Number(req.params.id);
//     users = users.filter(use => use.id !== id);

//     if(users[id]) {
//         Object.assign(found, changes);
//         res.status(200).json(found);
//     } else if (!users[id]) {
//         res.status(404).json({ message: "The user with the specified ID does not exist." });
//     } else {
//         res.status(500).json({ errorMessage: "The user could not be removed" });
//     }
// });

server.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const newUsers = users.filter((user) => user.id !== id);

    if (users[id]) {
      res.status(200).json(newUsers);
    } else if (!users[id]) {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    }
  });

server.put("/api/users/:id", (req,res) => {
    const changes = req.body;
    const id = Number(req.params.id);
    const newUserName = req.body.name; // read the info
    const newUserBio = req.body.bio;

    let found = users.find(user => user.id === id);

    if(found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else if(!found) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else if(!newUserName || !newUserBio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
});

const port = 5000;
server.listen(port, () => console.log("server up..."));
