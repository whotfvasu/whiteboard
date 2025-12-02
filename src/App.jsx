import Board from "./components/Board/Board";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Toolbar from "./components/Toolbar/Toolbar";
import Toolbox from "./components/Toolbox/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useContext } from "react";
import BoardContext from "./store/board-context";
import { Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isUserLoggedIn } = useContext(BoardContext);

  if (!isUserLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const { isUserLoggedIn } = useContext(BoardContext);

  if (isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/canvas/:canvasId"
          element={
            <ProtectedRoute>
              <>
                <Toolbar />
                <Board />
                <Toolbox />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ToolboxProvider>
      <BoardProvider>
        <Toaster />
        <AppContent />
      </BoardProvider>
    </ToolboxProvider>
  );
}

export default App;
