const express = require('express');
const { createToDo, updateToDo } = require('./types');
const { toDo } = require('./db');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT

app.post('/todo', async(req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createToDo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:" Please provide valid inputs "
        })
        return;
    }

    await toDo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        message: "task created"
    })
})

app.get('/todos', async (req,res)=>{
    const todos = await toDo.find();
    res.json({todos})
})

app.put('/completed', async (req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = updateToDo.parse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            message:"Please provide valid inputs"
        })
        return;
    }

    await toDo.update({
        _id:req.body.id
    },{
        completed:true
    }) 

})





app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
});