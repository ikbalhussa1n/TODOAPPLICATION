import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/todo/fetch`, {
          withCredentials: true, // allows sending cookies
        });
        console.log(response.data.allTodos);
        setTodos(response.data.allTodos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todo!");
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, []);

  const createtodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:3000/todo/create`,
        {
          title: newTodo,
          isCompleted: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodos([...todos, response.data.todo]);
      setNewTodo("");
    } catch (error) {
      setError("Error creating todo!");
    }
  };

  const updateTodo = async (id) => {
    const todo = todos.find((t) => t._id == id);
    if (!todo) return;
    try {
      const response = await axios.post(
        `http://localhost:3000/todo/update/${id}`,
        {
          isCompleted: !todo.isCompleted,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((t) => (t._id == id ? response.data.todo : t)));
    } catch (error) {
      setError("Error update todo!");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      setTodos((prev) => prev.filter((t) => t._id !== id));
      setError(null);
    } catch (error) {
      setError("Failed to delete Todo!");
    }
  };

  const logout = async () => {
    try {
      const out = await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      navigate("/signin");
      console.log(out);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-80 lg:w-[420px] rounded-2xl shadow-xl p-5 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Todo Application
        </h1>

        <div className="flex gap-2">
          <input
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createtodo();
              }
            }}
            type="text"
            value={newTodo}
            placeholder="Enter todo"
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={createtodo}
          >
            Add
          </button>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center">{error} </div>
        ) : (
          <div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 w-full">
                <ul className="w-full">
                  {todos.map((t, indx) => {
                    return (
                      <li
                        key={t._id || indx}
                        className="flex justify-between w-full items-center"
                      >
                        <div className="flex items-center ">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-blue-500"
                            checked={t.isCompleted}
                            onChange={() => updateTodo(t._id)}
                          />

                          <span
                            className={`text-gray-700 w-full ml-2 ${
                              t.isCompleted ? "line-through" : ""
                            }`}
                          >
                            {t.title}
                          </span>
                        </div>
                        <div>
                          <button
                            className="text-red-500 hover:text-red-700 transition"
                            onClick={() => deleteTodo(t._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Todo Item */}
        <h6 className="text-center text-sm text-gray-500">
          {todos.filter((t) => !t.isCompleted).length} Todo remaining
        </h6>
        {/* Logout */}
        <button
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
