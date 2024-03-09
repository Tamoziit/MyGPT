import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chats from "./pages/Chats";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";

function App() {
  const auth = useAuth();
  
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chats />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;