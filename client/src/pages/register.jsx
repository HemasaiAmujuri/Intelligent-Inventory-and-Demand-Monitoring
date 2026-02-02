import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

   const baseURL = import.meta.env.VITE_BASE_URL;

   const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

  // Password mismatch check
  if (formData.password !== formData.confirmPassword) {
    setMessage("Passwords do not match");

    // Clear message and form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
      setMessage("");
    }, 3000);

    return; // Stop further execution
  }

  // Prepare payload
  const { confirmPassword, ...payLoad } = formData;

  try {
    const response = await fetch(`${baseURL}/api/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    });

    const data = await response.json();

    if (response.ok) {
      // Success
      setMessage(data.message || "Registration Successful");

      // Navigate after 3 seconds
      setTimeout(() => {
        navigate("/inventoryList");
      }, 3000);
    } else {
      // API returned an error (e.g., user exists)
      setMessage(data.message || "Registration failed");

      // Clear form & message after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
        setMessage("");
      }, 3000);
    }
  } catch (err) {
    // Network or server error
    setMessage(err.message || "Server failed");

    // Clear form & message after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
      setMessage("");
    }, 3000);
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

        <div className="flex flex-col gap-1">
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>

    <div className="w-full flex justify-end mt-2">
  <span className="text-blue-600">
    Already have an account? <Link to="/login" className="hover:text-blue-800">Login</Link>
  </span>
</div>

      </form>

         

       {message && (
          <p
            className="text-sm text-center bg-blue-200 border rounded-lg p-2" 
          >
            {message}
          </p>
        )}
    </div>
  );
}

export default Register;




