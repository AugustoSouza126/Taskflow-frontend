import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    // Quantidade total de tarefas
    const totalTasks = tasks.length;

    // Quantidade de tarefas TODO
    const todoTasks = tasks.filter(task => task.status === "TODO").length;

    // Quantidade de tarefas em andamento
    const inProgressTasks = tasks.filter(task => task.status === "IN_PROGRESS").length;

    // Quantidade de tarefas concluídas
    const doneTasks = tasks.filter(task => task.status === "DONE").length;

    // Campo título
    const [title, setTitle] = useState("");

    // Campo descrição
    const [description, setDescription] = useState("");

    // Campo status
    const [status, setStatus] = useState("TODO");

    const [showModal, setShowModal] = useState(false);

    // Salva uma nova tarefa
    async function createTask() {

        try {
            // Busca token salvo no login
            const token = localStorage.getItem("token");

            // Envia os dados para a API
            await api.post(
                "/tasks",
                {
                    title,
                    description,
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Fecha o modal
            setShowModal(false);

            // Limpa os campos
            setTitle("");
            setDescription("");
            setStatus("TODO");

            // Atualiza lista de tarefas
            loadTasks();

        } catch (error) {

            console.error(error);

            alert("Erro ao criar tarefa");
        }
    }

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

                <button
                    onClick={() => setShowModal(true)}
                >
                    Nova Tarefa
                </button>

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

            {
                showModal && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>Nova Tarefa</h2>

                            <input
                                type="text"
                                placeholder="Título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                placeholder="Descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="TODO">Pendente</option>

                                <option value="IN_PROGRESS">Em andamento</option>

                                <option value="DONE">Concluída</option>
                            </select>

                            <div className="modal-buttons">

                                <button
                                    className="cancel-button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>

                                <button
                                    className="save-button"
                                    onClick={createTask}
                                >
                                    Salvar
                                </button>
                            </div>

                        </div>

                    </div>

                )
            }
        </div>
    );
}

export default Dashboard;