const { getModelForTenant } = require("../utils/modelHelper");

// const Todo = require("../models/todo");
const MODEL_NAME = "Todo";

const getAllTodos = async (req, res) => {
  try {
    const Todo = getModelForTenant(req.dbConnection, MODEL_NAME);
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch" });
  }
};

const createTodo = async (req, res) => {
  const { title } = req.body;

  try {
    const Todo = getModelForTenant(req.dbConnection, MODEL_NAME);
    const newTodo = await Todo.create({ title });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Unable to Create" });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const Todo = getModelForTenant(req.dbConnection, MODEL_NAME);
    const todoUpdate = await Todo.findById(id);
    if (!todoUpdate) {
      return res.status(404).json({ error: "Not Found" });
    }
    todoUpdate.completed = !todoUpdate.completed;
    await todoUpdate.save();
    res.json(todoUpdate);
  } catch (error) {
    res.status(500).json({ error: "Unable to Update" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const Todo = getModelForTenant(req.dbConnection, MODEL_NAME);
    await Todo.findByIdAndDelete(id);
    res.status(204).json({ message: "Successfully deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Unable to Delete" });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
