import express from "express";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  {
    id: 1,
    userName: "Bruce",
    age: 30,
    city: "New York",
  },
  {
    id: 2,
    userName: "Tony",
    age: 34,
    city: "London",
  },
  {
    id: 3,
    userName: "Adam",
    age: 30,
    city: "New York",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to Express.js workSpace!");
});

// request query
// localhost:3000/api/users?filter=userName&value=a

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
});

// get users with id (req.params)
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

// post requests

app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

// put request 
app.put("/api/users/:id", (req, res) => {
  console.log(req.body);
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if(findUserIndex === -1) return res.sendStatus(404)
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

app.patch("/api/users/:id", (req, res)=>{
  const { body, params: {id} } = req;
  const parsedId = parseInt(id)
  if(isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user)=>user.id===parsedId)
  if(findUserIndex===-1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return res.sendStatus(200)
})

app.delete("/api/users/:id", (req, res)=>{
  const { params: {id} } = req;
  const parsedId = parseInt(id)
  if(isNaN(parsedId)) return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user)=> user.id===parsedId)
  mockUsers.splice(findUserIndex, 1)
  return res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
