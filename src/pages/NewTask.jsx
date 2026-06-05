import { useState } from "react";
import api from "../services/api";

function NewTask() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");

    async function handleCreateTask() {

        try {

            const token = localStorage.getItem("token");

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

            alert("Tarefa criada com sucesso!");

        } catch (error) {

            console.error(error);

            alert("Erro ao criar tarefa");
        }
    }

    return (

        <div>

            <h1>Nova Tarefa</h1>

            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="TODO">
                    A Fazer
                </option>

                <option value="IN_PROGRESS">
                    Em Andamento
                </option>

                <option value="DONE">
                    Concluída
                </option>
            </select>

            <br /><br />

            <button onClick={handleCreateTask}>
                Salvar
            </button>

        </div>

    );
}

export default NewTask;