import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminLogin from "../../hooks/admin/useAdminLogin";
import { ClipLoader } from "react-spinners";

function AdminLoginForm() {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { adminLogin, error, loading } = useAdminLogin();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminLogin(email, password);
  };

  const handleDemoLogin = async(e) => {
    await adminLogin("admin@gmail.com","admin@123")
  }

  return (
    <div className="flex justify-center h-screen items-center bg-gray-50">
      <div className="w-80 sm:w-96 shadow-2xl px-5 py-6 bg-white">
        <div className="grid gap-8">
          <div className="grid gap-2">
            <div className="text-2xl font-bold">Welcome Admin</div>
            <div className="text-sm font-light text-gray-500">
              Welcome back! Please enter your details
            </div>
          </div>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div>
              <input
                className="w-full border-2 border-gray-300 p-2 rounded-md"
                ref={inputRef}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                className="w-full border-2 border-gray-300 p-2 rounded-md"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex">
              <div>
                <input
                  type="checkbox"
                  className="mr-2 cursor-pointer"
                  id="checkbox"
                  defaultChecked
                />
                <label
                  className="text-sm font-light text-gray-500 cursor-pointer"
                  htmlFor="checkbox"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button className="text-white bg-blue-500 p-2 border-2 border-blue-500 hover:bg-white hover:text-blue-500 rounded-md transition-all duration-300">
                {loading ? <ClipLoader size={20} color={"#fff"} /> : "Login"}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={handleDemoLogin} type="button" className="text-blue-500 p-2 border-2 border-blue-500 bg-white hover:bg-blue-500 hover:text-white rounded-md transition-all duration-300">
                Demo Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginForm;
