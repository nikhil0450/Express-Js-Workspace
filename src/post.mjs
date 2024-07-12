// POST: Send data to the server to create something new. Like submitting a form or uploading a file.

app.post("/api/users", (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
  });
  