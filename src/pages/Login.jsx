import { useState } from "react";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {

  try {

    const response = await api.post("/auth/login", {
      email,
      password,
    });

    console.log(response.data);

  } catch (error) {

    console.error(error);

  }
}

  return (
    <div>
      <h1>TaskFlow</h1>

      <p>Faça login para continuar</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Entrar
      </button>

      <p>Email digitado: {email}</p>
      <p>Senha digitada: {password}</p>

      

    </div>
  );
}

export default Login;