import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'

// import components
import Home from './components/Home/Home.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ManageEvents from './components/ManageEvents/ManageEvents.jsx';
import Help from './components/Help/Help.jsx';

// import AuthContext for logged in status & Events for events array
import { AuthProvider } from './AuthContext.jsx';
import { EventProvider } from './EventContext.jsx';

// create a browser router that routes to each component
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/manage-events",
    element: <ManageEvents/>,
  },
  {
    path: "/help",
    element: <Help/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <EventProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </EventProvider>
  </StrictMode>,
);
