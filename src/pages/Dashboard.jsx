import "../styles/Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-container">

            <aside className="sidebar">
                <h2>TaskFlow</h2>

                <button>Minhas Tarefas</button>
                <button>Nova Tarefa</button>
                <button>Sair</button>
            </aside>

            <main className="dashboard-content">

                <h1>Minhas Tarefas</h1>

                <div className="task-card">
                    <h3>Estudar React</h3>
                    <p>Concluir módulo de componentes</p>
                </div>

            </main>

        </div>
    );
}

export default Dashboard;