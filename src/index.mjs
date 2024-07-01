import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

const mockUsers = [
  {
    id: 1,
    userName: "Bruce",
    age: 30,
  },
  {
    id: 2,
    userName: "Tony",
    age: 34,
  },
  {
    id: 3,
    userName: "Adam",
    age: 30,
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to Express.js workSpace!");
});

app.get("/api/users", (req, res) => {
  res.status(200).send(mockUsers);
});

app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.status(400).send({
      msg: "Bad request. Invalid id!",
    });
  }
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return res.send({ msg: "User not found!" });
  res.status(200).send(findUser);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
