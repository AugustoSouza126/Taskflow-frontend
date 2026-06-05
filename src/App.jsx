import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewTask from "./pages/NewTask";

function App() {

  return (

      <BrowserRouter>

        <Routes>

          <Route
              path="/"
              element={<Login />}
          />

          <Route
              path="/register"
              element={<Register />}
          />

          <Route
              path="dashboard"
              element={<Dashboard />}
          />

          <Route
             path="/new-task"
             element={<NewTask />}
          />

        </Routes>

      </BrowserRouter>

  );
}

export default App;