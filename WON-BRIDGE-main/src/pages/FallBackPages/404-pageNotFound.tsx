import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div translate="no" className="notranslate flex flex-col md:flex-row items-center justify-between max-h-screen bg-[var(--background-default)] p-6">
      <div className="max-w-xl ">
        <h1 className="text-6xl font-bold text-gray-900">
          UH OH! You're lost!
        </h1>
        <p className="text-2xl font-semibold text-orange-500 mt-2">
          Something Went Wrong!
        </p>
        

        <p className="text-black mt-4">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>

        <button onClick={() => navigate('/')} className="group flex items-center mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300 cursor-pointer ">
          Go Home
          <span className="ml-2 text-xl transform transition-transform duration-300 group-hover:translate-x-2">
            <FaChevronRight />
          </span>
        </button>
      </div>

      <div
        className="relative h-screen w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/404-robot.png')" }}
      />
    </div>
  );
}
