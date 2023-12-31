import { useState } from "react";

const Rejestracja = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 === password2) {
      const password = password1;
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, address }),
      });
      if (response.ok) {
        window.location = "/";
      }
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-zinc-100 h-fit w-1/2 p-4 my-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block">
              Email
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword1(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block">
              Repeat Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block">
              Address
            </label>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              onClick={(e) => handleSubmit(e)}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rejestracja;
