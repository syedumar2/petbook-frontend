import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatMessageBox = () => {
  return (
    <div className="w-full px-5 flex flex-col justify-between bg-gray-50">
      <div className="flex flex-col mt-5">
        {/* Sarah (adopter) */}
        <div className="flex justify-start mb-4">
          <Avatar className="size-10">
            <AvatarImage className={undefined} />
            <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
              S
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 py-3 px-4 bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl shadow-sm">
            Hi Mike, I saw your post about Bella. Is she still available for adoption?
          </div>
        </div>

        {/* Mike (owner) */}
        <div className="flex justify-end mb-4">
          <div className="mr-2 py-3 px-4 bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl shadow-sm">
            Hi Sarah! Yes, Bella is still looking for a loving home 🐶
          </div>
          <Avatar className="size-10">
            <AvatarImage className={undefined} />
            <AvatarFallback className="bg-gray-700 p-2 text-2xl text-white">
              M
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Sarah */}
        <div className="flex justify-start mb-4">
          <Avatar className="size-10">
            <AvatarImage className={undefined} />
            <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
              S
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 py-3 px-4 bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl shadow-sm">
            She looks adorable! Could you tell me about her temperament?
          </div>
        </div>

        {/* Mike */}
        <div className="flex justify-end mb-4">
          <div className="mr-2 py-3 px-4 bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl shadow-sm">
            Bella is 2 years old, very playful, friendly with kids, and vaccinated.
          </div>
          <Avatar className="size-10">
            <AvatarImage className={undefined} />
            <AvatarFallback className="bg-gray-700 p-2 text-2xl text-white">
              M
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Sarah */}
        <div className="flex justify-start mb-4">
          <Avatar className="size-10">
            <AvatarImage className={undefined} />
            <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
              S
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 py-3 px-4 bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl shadow-sm">
            That’s perfect. I think she’d be a great fit for my family. Can we schedule a visit this weekend?
          </div>
        </div>

        {/* Mike */}
        <div className="flex justify-end mb-4">
          <div className="mr-2 py-3 px-4 bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl shadow-sm">
            Absolutely! Saturday afternoon works for me.
          </div>
          <Avatar className="size-10">
            <AvatarImage className={undefined} />
            <AvatarFallback className="bg-gray-700 p-2 text-2xl text-white">
              M
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Input box */}
      <div className="py-5">
        <input
          className="w-full bg-gray-200 py-4 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
};

export default ChatMessageBox;
