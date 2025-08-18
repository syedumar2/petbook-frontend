import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="container mx-auto">
      <div className="flex justify-center px-6 my-12  ">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex p-0.5 border-2 rounded-2xl border-red-600">
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
            <h3 className="pt-4 text-2xl text-center">Log In</h3>

            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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
                  id="username"
                  type="text"
                  placeholder="Username"
                />
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
                  id="password"
                  type="password"
                  placeholder="******************"
                />
                <p className="text-xs italic text-red-500">
                  Please choose a password.
                </p>
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
                  className="w-full px-4 py-2 font-medium tracking-wide text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign In
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
