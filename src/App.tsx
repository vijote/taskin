import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import useApiWakeUp from "./hooks/useApiWakeUp.hook";
import NewTask from "./pages/NewTask.page";
import TaskPage from "./pages/Task.page";

export default function App() {
  const { error, loading } = useApiWakeUp()

  if (loading) return "Despertando servicio API..."

  if (error) return "Error al intentar despertar el servicio API!"

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="new-task" element={<NewTask />} />
        <Route path="task/:taskId" element={<TaskPage />} />
        <Route path="register" element={<Register />} />

        {/* not found route */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}