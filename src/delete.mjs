// DELETE: Ask the server to remove something. Like deleting a file or a record.

app.delete("/api/users/:id", (req, res)=>{
    const { params: {id} } = req;
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const findUserIndex = mockUsers.findIndex((user)=> user.id===parsedId)
    mockUsers.splice(findUserIndex, 1)
    return res.sendStatus(200)
})