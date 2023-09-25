import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AxiosImplementation from './api/axiosImplementation.ts';
import Layout from './pages/Layout.tsx';
import Home from './pages/Home.tsx';
import userLoader from './loaders/userLoader.ts'
import LoginPage from './pages/Login.page.tsx';

AxiosImplementation.setSingleton({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  timeout: 5000
})

{/* <Routes>
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

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes> */}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: userLoader
      },
      {
        path: 'user',
        children: [{
          path: 'login',
          element: <LoginPage />,
        }]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
