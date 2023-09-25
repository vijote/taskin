import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './pages/router.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>
);
