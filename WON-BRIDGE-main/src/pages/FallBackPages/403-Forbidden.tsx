import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between h-full bg-[var(--background-default)] p-6 rounded-lg z-99">
      <div
        className="relative h-full w-1/2 bg-cover bg-center "
        style={{ backgroundImage: "url('/images/403-forbidden.png')" }}
      />

      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-6xl font-bold">We are Sorry...</h1>
        <p className="mt-4 text-xl">
          The page you're to access has restricted access.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center w-fit mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300 cursor-pointer "
        >
          Go Home
          <span className="ml-2 text-xl transform transition-transform duration-300 group-hover:translate-x-2">
            <FaChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
}
