import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row border-2 rounded-2xl border-red-600 shadow-lg overflow-hidden">
         {/* Left Side Image */}
          <div className="w-full h-auto bg-gray-100 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
            <h3 className=" flex justify-center items-center h-11/12">
              <span className="font-bold text-5xl flex ">
                <div className="text-red-600">Pet</div>Book
              </span>
            </h3>
          </div>
        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <h3 className="text-2xl text-center mb-4 pt-4 ">Register</h3>

     <form className="px-8 pt-6 pb-8 mb-4 space-y-2 bg-white rounded">
            {/* First Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="firstname">
                First Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm border rounded shadow-sm focus:outline-none focus:shadow-outline"
                id="firstname"
                type="text"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm border rounded shadow-sm focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                placeholder="Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 text-sm border rounded shadow-sm focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="example@domain.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 text-sm border border-red-500 rounded shadow-sm focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-xs italic text-red-500 mt-1">
                Please choose a password.
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="location">
                Location
              </label>
              <input
                className="w-full px-3 py-2 text-sm border rounded shadow-sm focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                placeholder="City, State"
              />
            </div>

            {/* Register Button */}
           <div className="mb-6 mt-6 text-center">
                <button
                  className="w-full px-4 py-2 font-medium tracking-wide text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline"
                  type="button"
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
        </div>
      </div>
    </section>
  );
};

export default Register;



