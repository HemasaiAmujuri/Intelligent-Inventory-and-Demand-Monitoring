import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail(""); // reset email state
    setPassword(""); // reset password state
    setMessage(""); // reset message state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/user/login`, {
        ///api integration
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); //parse the response

      if (response.ok) {
        setMessage(data.message || "Login Successful"); //display message
        localStorage.setItem("name", data?.data?.name)

        // Navigate after 3 seconds
        setTimeout(() => {
          navigate("/inventoryList");
        }, 3000);
      } else {
        //any api error
        setMessage(data.message || "Login failed");

        // Clear form & message after 3 seconds
        setTimeout(resetForm, 3000);
      }
    } catch (err) {
      // Network or server error
      setMessage(err.message || "Server failed");

      // Clear form & message after 3 seconds
      setTimeout(resetForm, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold text-center"> Login </h1>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="relative flex flex-col gap-1">
          <label className="font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            title={showPassword ? "Hide password" : "Show password"}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            value={password}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <span
            type="button"
            className="absolute bottom-3 right-4 cursor-pointer"
            onClick={(e) => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting" : "Submit"}
        </button>

        <div className="w-full flex justify-end mt-2">
          <span className="text-blue-600">
            Don't have an account?{" "}
            <Link to="/register" className="hover:text-blue-800">
              Sign up
            </Link>
          </span>
        </div>
      </form>

      {message && (
        <p className="text-sm text-center bg-blue-200 border rounded-lg p-2">
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
