import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    // Hook para redirecionamento
    const navigate = useNavigate();

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

    // Guarda o id da tarefa que está sendo editada
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Guarda qual filtro o usuário selecionou
    const [filter, setFilter] = useState("ALL");

    // Guarda os dados do usuário logado
    const [user, setUser] = useState(null);

    // Lista filtrada conforme o botão selecionado
    const filteredTasks =
        filter === "ALL"
            ? tasks
            : tasks.filter(
                task => task.status === filter
            );

    const sortedTasks = [...filteredTasks].sort(

        (a, b) =>

            new Date(b.createdAt) -

            new Date(a.createdAt)

    );



    // Verifica se usuário está autenticado
    useEffect(() => {

        // Busca token salvo
        const token =
            localStorage.getItem("token");

        // Se não existir token
        if (!token) {

            // Volta para login
            navigate("/");

        }

    }, []);

    // Busca dados do usuário logado
    async function loadUser() {

        try {

            // Busca token salvo
            const token =
                localStorage.getItem("token");

            // Chama endpoint /auth/me
            const response =
                await api.get(
                    "/auth/me",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            console.log("USER:", response.data);

            setUser(response.data);
        } catch (error) {

            console.error(error);

        }
    }

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
            // Fecha modal
            setShowModal(false);

            // Sai do modo edição
                        setEditingTaskId(null);

            // Limpa campos
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

        loadUser();

    }, []);

    // Exclui uma tarefa pelo id
    async function deleteTask(id) {

        try {

            // Busca token salvo no navegador
            const token = localStorage.getItem("token");

            // Chama endpoint DELETE
            await api.delete(
                `/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Atualiza lista após exclusão
            loadTasks();

        } catch (error) {

            console.error(error);

            alert("Erro ao excluir tarefa");

        }
    }

    // Abre modal preenchendo os dados da tarefa
    function openEditModal(task) {

        // Salva id da tarefa
        setEditingTaskId(task.id);

        // Preenche campos
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);

        // Abre modal
        setShowModal(true);
    }

    // Atualiza uma tarefa existente
    async function updateTask() {

        try {

            // Busca token salvo após login
            const token =
                localStorage.getItem("token");

            // Envia atualização para API
            await api.put(
                `/tasks/${editingTaskId}`,
                {
                    title,
                    description,
                    status
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            // Fecha modal
            setShowModal(false);

            // Limpa campos
            setTitle("");
            setDescription("");
            setStatus("TODO");

            // Sai do modo edição
            setEditingTaskId(null);

            // Atualiza lista
            loadTasks();

        } catch (error) {

            console.error(error);

            alert("Erro ao atualizar tarefa");

        }
    }

    // Faz logout do usuário
    function logout() {

        // Remove token salvo
        localStorage.removeItem("token");

        // Volta para tela de login
        navigate("/");

    }

    return (


        <div className="dashboard-container">

            <aside className="sidebar">

                <h2>TaskFlow</h2>

                <p className="sidebar-user">

                    Olá,
                    {" "}

                    {
                        user
                            ? user.name
                            : "Usuário"
                    }

                    👋

                </p>

                <button>Minhas Tarefas</button>

                <button
                    onClick={() => setShowModal(true)}
                >
                    Nova Tarefa
                </button>

                <button onClick={logout}>
                    Sair
                </button>

            </aside>

            <main className="dashboard-content">

                <div className="dashboard-header">

                    <h1>Minhas Tarefas</h1>

                </div>

                {/* Botões de filtro */}
                <div className="filter-container">

                    <button
                        className={
                            filter === "ALL"
                                ? "active-filter"
                                : ""
                        }
                        onClick={() => setFilter("ALL")}
                    >
                        Todas
                    </button>

                    <button
                        className={
                            filter === "TODO"
                                ? "active-filter"
                                : ""
                        }
                        onClick={() => setFilter("TODO")}
                    >
                        Pendentes
                    </button>

                    <button
                        className={
                            filter === "IN_PROGRESS"
                                ? "active-filter"
                                : ""
                        }
                        onClick={() => setFilter("IN_PROGRESS")}
                    >
                        Em andamento
                    </button>

                    <button
                        className={
                            filter === "DONE"
                                ? "active-filter"
                                : ""
                        }
                        onClick={() => setFilter("DONE")}
                    >
                        Concluídas
                    </button>

                </div>

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
                        sortedTasks.map(task => (
                            <div
                                key={task.id}
                                className="task-card"
                                >
                                <div className="task-info">

                                    <h3>{task.title}</h3>

                                    <p>{task.description}</p>

                                    <small className="task-date">
                                        {
                                            new Date(task.createdAt)
                                                .toLocaleDateString("pt-BR")
                                        }
                                    </small>

                                </div>

                                <div className="task-actions">
                                    <span
                                        className={`status ${task.status}`}
                                    >
                                        {
                                            task.status === "TODO"
                                                ? "🟡 Pendente"
                                                : task.status === "IN_PROGRESS"
                                                    ? "🔵 Em andamento"
                                                    : "🟢 Concluída"
                                        }
                                    </span>

                                    <button
                                        onClick={() =>
                                            openEditModal(task)
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => {

                                            // Pergunta ao usuário se deseja excluir
                                            const confirmDelete =
                                                window.confirm(
                                                    "Deseja realmente excluir esta tarefa?"
                                                );
                                            // Se confirmou
                                            if (confirmDelete) {

                                                deleteTask(task.id);

                                            }
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    filteredTasks.length === 0 && (

                        <div className="empty-state">

                            {/* Ícone */}
                            <div className="empty-icon">
                                📋
                            </div>

                            {/* Título */}
                            <h3>
                                Nenhuma tarefa encontrada
                            </h3>

                            {/* Descrição */}
                            <p>
                                Crie sua primeira tarefa para começar a organizar seu trabalho.
                            </p>

                            {/* Botão */}
                            <button
                                className="empty-button"
                                onClick={() => setShowModal(true)}
                            >
                                + Nova Tarefa
                            </button>

                        </div>

                    )
                }
            </main>

            {
                showModal && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>
                                {
                                    editingTaskId
                                        ? "Editar Tarefa"
                                        : "Nova Tarefa"
                                }
                            </h2>

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
                                    onClick={
                                        editingTaskId
                                            ? updateTask
                                            : createTask
                                    }
                                >
                                    {
                                        editingTaskId
                                            ? "Atualizar"
                                            : "Salvar"
                                    }
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