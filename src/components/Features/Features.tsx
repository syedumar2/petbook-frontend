

const Features = () => {
  return (
   <section className="py-20 px-2">
  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="flex flex-col items-center text-center p-6 space-y-4 hover:shadow-lg transition">
        <div className="bg-red-100 p-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Adopt with Ease</h3>
        <p className="text-gray-600">
          Browse verified cats and dogs, view their details, and find your perfect match in just a few clicks.
        </p>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-center text-center p-6 space-y-4 hover:shadow-lg transition">
        <div className="bg-red-100 p-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">List Your Pets</h3>
        <p className="text-gray-600">
          Have a pet that needs a new home? Post them on PetBook and connect with caring adopters.
        </p>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col items-center text-center p-6 space-y-4 hover:shadow-lg transition">
        <div className="bg-red-100 p-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m-6 4h8" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Chat Instantly</h3>
        <p className="text-gray-600">
          Message adopters and pet owners in real-time, ask questions, and stay connected throughout the adoption process.
        </p>
      </div>
    </div>
  
</section>
  )
}

export default Features