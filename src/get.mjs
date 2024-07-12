// GET: Retrieve information from the server. Like asking for a webpage or data.

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
  