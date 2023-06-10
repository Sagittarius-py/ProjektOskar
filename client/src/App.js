import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./modules/header";
import Footer from "./modules/footer";
import Landing from "./components/landing";
import Koszyk from "./components/koszyk";
import Logowanie from "./components/logowanie";
import Produkty from "./components/produkty";
import Admin from "./components/pages_admin/Admin";
import Rejestracja from "./components/rejesstracja";

function App() {
  return (
    <div className="App h-fit relatiwe">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} exact />
        </Routes>
        <Routes>
          <Route path="/koszyk" element={<Koszyk />} exact />
        </Routes>
        <Routes path="/logowanie">
          <Route path="/logowanie" element={<Logowanie />} exact />
        </Routes>
        <Routes path="/rejestracja">
          <Route path="/rejestracja" element={<Rejestracja />} exact />
        </Routes>
        <Routes path="/produkty">
          <Route path="/produkty" element={<Produkty />} exact />
        </Routes>
        <Routes path="/admin">
          <Route path="/admin" element={<Admin />} exact />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
