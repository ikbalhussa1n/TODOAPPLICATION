import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      isCompleted: req.body.isCompleted,
      user: req.user._id,
    });

    const todo = await newTodo.save();

    res.status(200).json({ message: "Todo created!", todo });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create todo!", error: error.message });
  }
};

export const getTodo = async (req, res) => {
  try {
    const allTodos = await Todo.find({ user: req.user._id });

    res.status(200).json({ message: "Todo's fetched!", allTodos });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching todos!", error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Todo updated!", todo });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update todo!", error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted sucessfully", todo });
  } catch (error) {
    res.status(400).json({ message: "Todo failed to Delete", todo });
  }
};
