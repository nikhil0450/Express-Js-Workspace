// PATCH: Send data to the server to partially update something. Like changing only one field in a record.
// Patch can also be used to add one or more field to the existing data.

app.patch("/api/users/:id", (req, res)=>{
    const { body, params: {id} } = req;
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user)=>user.id===parsedId)
    if(findUserIndex===-1) return res.sendStatus(404);
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.sendStatus(200)
  })