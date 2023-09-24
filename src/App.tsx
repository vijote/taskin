import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import useApiWakeUp from "./hooks/useApiWakeUp.hook";

export default function App() {
  const { error, loading } = useApiWakeUp()

  if (loading) return "Despertando servicio API..."

  if (error) return "Error al intentar despertar el servicio API!"

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register" element={<Register />} />

        {/* not found route */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
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