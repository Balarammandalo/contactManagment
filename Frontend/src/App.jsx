import Layout from "./Component/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AuthContextProvider } from "./context/authContext";
import { ToastContextProvider } from "./context/toastContext";
import CreateContact from "./Pages/CreateContact";
import AllContact from "./Pages/AllContact";
import EditContact from "./Pages/EditContact";

const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateContact />} />
            <Route path="/mycontact" element={<AllContact />} />
            <Route path="/contact/:id" element = {<EditContact/>} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
