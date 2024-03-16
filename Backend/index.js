const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todoModel } = require("./db");
const cors = require("cors");

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
  const payLoad = req.body;
  const parsedPayLoad = createTodo.safeParse(payLoad);
  if (!parsedPayLoad.success) {
    //If condition fails return user with error message
    res.status(411).json({
      msg: "Wrong input",
    });
    return;
  }

  //Else part is putting into database
  try {
    await todoModel.create({
      title: payLoad.title,
      description: payLoad.description,
      completed: false,
    });
    res.json({
      msg: "Todo created",
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

app.get("/todos", async (req, res) => {
    try {
      const todos = await todoModel.find({});
      res.json({
        todos,
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  });

app.put("/completed", async (req, res) => {
  const createPayLoad = req.body;
  const parsed = updateTodo.safeParse(createPayLoad);
  if (!parsed.success) {
    res.status(411).json({
      msg: "Wrong inputs ",
    });
  }

  await todoModel.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Todo marked as done",
  });
});

app.listen(3000);
