import { useState } from "react";
import api from "../services/api";
import "../styles/Login.css";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            console.log("Login realizado!");

        } catch (error) {

            console.error(error);

        }
    }

    return (

        <div className="login-container">

            <div className="login-card">

                <h1 className="login-title">
                    TaskFlow
                </h1>

                <p className="login-subtitle">
                    Faça login para continuar
                </p>

                <div className="login-form">

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
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>

                </div>

                <div className="login-footer">

                    Não possui conta?

                    <br />

                    <Link
                        to="/register"
                        className="login-link"
                    >
                        Cadastre-se
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;