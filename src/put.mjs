// PUT: Send data to the server to update something that already exists. Like editing a document.

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
  