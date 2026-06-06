import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    // Quantidade total de tarefas
    const totalTasks = tasks.length;

// Quantidade de tarefas TODO
    const todoTasks = tasks.filter(
        task => task.status === "TODO"
    ).length;

// Quantidade de tarefas em andamento
    const inProgressTasks = tasks.filter(
        task => task.status === "IN_PROGRESS"
    ).length;

// Quantidade de tarefas concluídas
    const doneTasks = tasks.filter(
        task => task.status === "DONE"
    ).length;

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

                <button>Minhas Tarefas</button>

                <Link to="/new-task">
                    <button>Nova Tarefa</button>
                </Link>

                <button>Sair</button>

            </aside>

            <main className="dashboard-content">

                <h1>Minhas Tarefas</h1>

                <div className="stats-container">

                    <div className="stat-card">
                        <h2>{totalTasks}</h2>
                        <p>Total</p>
                    </div>

                    <div className="stat-card">
                        <h2>{todoTasks}</h2>
                        <p>Pendentes</p>
                    </div>

                    <div className="stat-card">
                        <h2>{inProgressTasks}</h2>
                        <p>Em andamento</p>
                    </div>

                    <div className="stat-card">
                        <h2>{doneTasks}</h2>
                        <p>Concluídas</p>
                    </div>

                </div>

                <div className="tasks-grid">
                    {
                        tasks.map(task => (
                            <div
                                key={task.id}
                                className="task-card"
                                >
                                <div className="task-info">
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                </div>

                                <div className="task-actions">
                                    <span
                                        className={`status ${task.status}`}
                                    >
                                        {task.status}
                                    </span>

                                    <button>Editar</button>

                                    <button>Excluir</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </main>
        </div>
    );
}

export default Dashboard;