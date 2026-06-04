import { useState } from "react";
import api from "../services/api";
import "../styles/Login.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {

        try {

            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log(response.data);

            alert("Usuário cadastrado com sucesso!");

        } catch (error) {

            console.error(error);

            alert("Erro ao cadastrar usuário");

        }
    }

    return (

        <div className="login-container">

            <div className="login-card">

                <h1 className="login-title">
                    TaskFlow
                </h1>

                <p className="login-subtitle">
                    Crie sua conta gratuitamente
                </p>

                <div className="login-form">

                    <input
                        className="login-input"
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        className="login-input"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="login-button"
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Register;