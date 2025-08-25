import { LoginForm } from "@/components";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="container mx-auto">
      <div className="flex justify-center px-6 my-12  ">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex p-0.5 border-2 rounded-2xl border-red-600">
          <div className="w-full h-auto bg-gray-100 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
            <h3 className=" flex justify-center items-center h-11/12">
              <Link to="/">
                <span className="font-bold text-5xl flex ">
                  <div className="text-red-600">Pet</div>Book
                </span>
              </Link>
            </h3>
          </div>

          {/* Right Side Form */}
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Log In</h3>

            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
