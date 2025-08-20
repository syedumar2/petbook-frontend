import RegisterForm from "@/components/Forms/RegisterForm";

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

          <RegisterForm />
        </div>
      </div>
    </section>
  );
};

export default Register;
