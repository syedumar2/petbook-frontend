import { useAuth } from "@/context/AuthContext";
import { RegisterRequest } from "@/types/user";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterForm = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<RegisterRequest>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
  });
  const [errors, setErrors] = useState<{
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    location?: string;
  }>({});

  const navigate = useNavigate();

  const FNAME_REGEX = /^[A-Za-z][A-Za-z'-]{1,}$/;
  const LNAME_REGEX = /^[A-Za-z][A-Za-z'-]{1,}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
  const PSWD_LENGTH = 4;
  const LOCATION_REGEX = /^[A-Za-z]+,\s[A-Za-z]+/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: EMAIL_REGEX.test(value) ? "" : "Enter a valid email",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password:
          value.length >= PSWD_LENGTH
            ? ""
            : "Password must be atleast 8 characters",
      }));
    } else if (name == "firstname") {
      setErrors((prev) => ({
        ...prev,
        firstname: FNAME_REGEX.test(value) ? "" : "Enter a Valid First Name",
      }));
    } else if (name == "lastname") {
      setErrors((prev) => ({
        ...prev,
        lastname: LNAME_REGEX.test(value) ? "" : "Enter a Valid Last Name",
      }));
    }
    else if (name == "location") {
      setErrors((prev) => ({
        ...prev,
        location: LOCATION_REGEX.test(value) ? "" : "Enter a Valid Location",
      }));
    }
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    !errors.firstname &&
    !errors.lastname &&
    !errors.location &&
    form.email &&
    form.password;

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      setLoading(true); // 🔹 Start loading
      const response = await register(form);

      if (response.success) {
        toast.success(response.message);
        navigate("/login");
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
      className="px-8 pt-6 pb-8 mb-4 space-y-2 bg-white rounded"
      onSubmit={onSubmitForm}
    >
      {/* First Name */}
      <div>
        <label
          className="block text-sm font-bold text-gray-700 mb-1"
          htmlFor="firstname"
        >
          First Name
        </label>
        <input
          className="w-full px-3 py-2 text-sm border rounded shadow-sm focus:outline-none focus:shadow-outline"
          name="firstname"
          type="text"
          placeholder="John"
          value={form.firstname}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.firstname && (
          <p className="text-xs text-red-500 mt-2">{errors.firstname}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label
          className="block text-sm font-bold text-gray-700 mb-1"
          htmlFor="lastname"
        >
          Last Name
        </label>
        <input
          className="w-full px-3 py-2 text-sm border rounded shadow-sm focus:outline-none focus:shadow-outline"
          name="lastname"
          type="text"
          placeholder="Doe"
          value={form.lastname}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.lastname && (
          <p className="text-xs text-red-500 mt-2">{errors.lastname}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          className="block text-sm font-bold text-gray-700 mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full px-3 py-2 text-sm border rounded shadow-sm focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="example@domain.com"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.firstname && (
          <p className="text-xs text-red-500 mt-2">{errors.firstname}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          className="block text-sm font-bold text-gray-700 mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-2 text-sm border border-red-500 rounded shadow-sm focus:outline-none focus:shadow-outline"
          name="password"
          type="password"
          placeholder="******************"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-2">{errors.password}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label
          className="block text-sm font-bold text-gray-700 mb-1"
          htmlFor="location"
        >
          Location
        </label>
        <input
          className="w-full px-3 py-2 text-sm border rounded shadow-sm focus:outline-none focus:shadow-outline"
          name="location"
          type="text"
          placeholder="City, State"
          value={form.location}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.location && (
          <p className="text-xs text-red-500 mt-2">{errors.location}</p>
        )}
      </div>

      {/* Register Button */}
      <div className="mb-6 mt-6 text-center">
        <button
          className="w-full px-4 py-2 font-medium tracking-wide text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={loading || !isFormValid}
        >
          Sign Up
        </button>
      </div>

      <hr className="border-t" />

      {/* Links */}
      <div className="text-center">
        <Link
          className="inline-block text-sm text-blue-500 hover:text-blue-800"
          to="/login"
        >
          Already have an account? Log in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
