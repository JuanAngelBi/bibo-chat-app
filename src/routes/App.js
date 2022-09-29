import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../context/ProtectedRoute";
import { Register } from "../pages/Register";
import { AuthProvider } from "../context/authContext";

function App() {
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
  //Sin los Provider lanza error porque no hay un contexto.
}

export default App;