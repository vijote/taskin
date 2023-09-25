import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import LoginPage from "./pages/Login.page";
import useApiWakeUp from "./hooks/useApiWakeUp.hook";
import NewTask from "./pages/NewTask.page";
import TaskPage from "./pages/Task.page";
import FilteredByStateTasksPage from "./pages/FilteredByStateTasks.page";
import AllTasksPage from "./pages/AllTasks.page";
import routes from "./pages/routes";
import userLoader from "./loaders/userLoader";

export default function App() {
  const { error, loading } = useApiWakeUp()

  if (loading) return "Despertando servicio API..."

  if (error) return "Error al intentar despertar el servicio API!"

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index loader={userLoader} element={<Home />} />

        <Route path="/task" loader={userLoader} element={<Layout />}>
          <Route index element={<AllTasksPage />} />
          <Route path="new" element={<NewTask />} />
          <Route path=":taskId" element={<TaskPage />} />
          <Route path="state/:state" element={<FilteredByStateTasksPage />} />
        </Route>

        <Route path="/user" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

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
        <Link to={routes.HOME}>Go to the home page</Link>
      </p>
    </div>
  );
}