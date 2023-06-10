import "./logowanie.css";

import { useState } from "react";
import Axios from "axios";

const Logowanie = () => {
  const [rola, setRola] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = async () => {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ rola, email, password }),
    });
    if (response.ok) {
      window.location = "/";
    }
  };

  return (
    <div id="login-form-wrap">
      <h2>Logowanie</h2>
      <br />
      <p>
        <select id="role" name="role" onChange={(e) => setRola(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="user">Użytkownik</option>
          <option value="seller">Sprzedawca</option>
        </select>
      </p>
      <p>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Adres e-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <i className="validation">
          <span></span>
          <span></span>
        </i>
      </p>
      <p>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Hasło"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <i className="validation">
          <span></span>
          <span></span>
        </i>
      </p>
      <p>
        <button
          id="formSubmit"
          onClick={() => {
            loginHandle();
          }}
        >
          Zaloguj
        </button>
      </p>
      <div id="create-account-wrap">
        <p>
          Nowy? <a href="/rejestracja">Stwórz konto tutaj</a>
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default Logowanie;
