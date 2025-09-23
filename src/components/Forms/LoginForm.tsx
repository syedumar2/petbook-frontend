import { useAuth } from "@/hooks/useAuth";
import { LoginRequest } from "@/types/user";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
  const PSWD_LENGTH = 4;

  const isFormValid =
    !errors.email && !errors.password && form.email && form.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: EMAIL_REGEX.test(e.target.value) ? "" : "Enter a valid email",
      }));
    } else if (e.target.name === "password") {
      setErrors((prev) => ({
        ...prev,
        password:
          e.target.value.length >= PSWD_LENGTH
            ? ""
            : "Password must be atleast 8 characters",
      }));
    }
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      setLoading(true); // 🔹 Start loading
      const response = await login(form);

      if (response.success) {
        toast.success(response.message);
        navigate("/profile");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
      onSubmit={onSubmitForm}
    >
      {/* Email */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="username"
        >
          Email
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          aria-label="Email field"
          type="text"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-2">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="password"
          aria-label="Password field"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="******************"
          disabled={loading}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="mb-4">
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          id="checkbox_id"
        />
        <label className="text-sm" htmlFor="checkbox_id">
          Remember Me
        </label>
      </div>

      {/* Sign In Button */}
      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-medium tracking-wide text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline 
               disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || !isFormValid}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </div>

      <hr className="mb-6 border-t" />

      {/* Links */}
      <div className="text-center">
        <Link
          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          to="/signup"
        >
          Create an Account!
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
