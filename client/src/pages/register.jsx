import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../components/loader";
import { useAuth } from "../context/useContext";


function Register() {
  const { setAccessToken } = useAuth();
  const [formData, setFormData] = useState({
    //initiate state for form data
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL; // get host url from env

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // it prevents browser default behaviour when form submit (prevent page refresh)
    if (formData.password !== formData.confirmPassword) {
      // checking password mismatches
      setMessage("Passwords do not match");

      // Clear message and form after 3 seconds
      setTimeout(resetForm, 3000);

      return; //stop execution further
    }

    const { confirmPassword, ...payLoad } = formData; //separate confirmPassword from form data not sent confirmPassword to api

    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/api/user/register`, {
        ///api integration
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payLoad),
      });

      const data = await response.json(); //parse the response

      setLoading(false);

      if (response.ok) {
        setMessage(data.message || "Registration Successful"); //display message
        setAccessToken(data?.token)
        // Navigate after 3 seconds
      } else {
        //any api error
        setMessage(data.message || "Registration failed");

        // Clear form & message after 3 seconds
        setTimeout(resetForm, 3000);
      }
    } catch (err) {
      // Network or server error
      setMessage(err.message || "Server failed");

      // Clear form & message after 3 seconds
      setTimeout(resetForm, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Mobile</label>
          <input
            type="tel"
            name="mobile"
            pattern="^[0-9]{10}$"
            minLength={10}
            value={formData.mobile}
            onChange={handleChange}
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
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <span
            className="absolute bottom-3 right-4 cursor-pointer"
            onClick={(e) => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="relative flex flex-col gap-1">
          <label className="font-medium">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            title={showConfirmPassword ? "Hide password" : "Show password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <span
            className="absolute bottom-3 right-4 cursor-pointer"
            onClick={(e) => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {/* // based on loading state */}
          {loading ? "Submitting" : "Submit"}
        </button>

        <div className="w-full flex justify-end mt-2">
          <span className="text-blue-600">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-blue-800">
              Login
            </Link>
          </span>
        </div>
      </form>

      {message && ( // message UI
        <p className="text-sm text-center bg-blue-200 border rounded-lg p-2">
          {message}
        </p>
      )}
      {loading && <Loader loading={loading} />}
    </div>
  );
}

export default Register;
