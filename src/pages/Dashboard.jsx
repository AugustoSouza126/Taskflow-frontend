import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    async function loadTasks() {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/tasks",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setTasks(response.data);

        } catch (error) {

            console.error(error);

        }
    }

    useEffect(() => {

        loadTasks();

    }, []);

    return (

        <div className="dashboard-container">

            <aside className="sidebar">

                <h2>TaskFlow</h2>

                <button>
                    Minhas Tarefas
                </button>

                <Link to="/new-task">
                    <button>
                        Nova Tarefa
                    </button>
                </Link>

                <button>
                    Sair
                </button>

            </aside>

            <main className="dashboard-content">

                <h1>
                    Minhas Tarefas
                </h1>

                {
                    tasks.map(task => (

                        <div
                            key={task.id}
                            className="task-card"
                        >

                            <h3>
                                {task.title}
                            </h3>

                            <p>
                                {task.description}
                            </p>

                            <span>
                                {task.status}
                            </span>

                        </div>

                    ))
                }

            </main>

        </div>

    );
}

export default Dashboard;