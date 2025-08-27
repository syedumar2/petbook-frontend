export const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mb-4"></div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  </div>
);
