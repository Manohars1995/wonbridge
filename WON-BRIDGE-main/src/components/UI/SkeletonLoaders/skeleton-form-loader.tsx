import { RiImageCircleLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

interface props {
  onClose: () => void;
}

const FormSkeleton = ({ onClose }: props) => {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .shimmer::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(108, 117, 125, 0.3),
              transparent
            );
            animation: shimmer 1.5s infinite;
          }
        `}
      </style>

      <div className="rounded-xl w-full max-w-xl mx-auto h-[100%] overflow-hidden flex flex-col">
        {/* Header/Title Skeleton */}
        <div className="flex justify-between px-1.5">
          <div className="h-8 w-48 mb-6 rounded bg-[var(--loader-skeleton-block)] relative overflow-hidden shimmer" />
          <button
            onClick={onClose}
            className="cursor-pointer h-8 w-8 flex items-center rounded-lg float-right text-xl p-1 bg-[var(--btn-cancel)] justify-center"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Avatar/Image Skeleton */}
        <div className="flex justify-center mb-6">
          <div className="h-30 w-30 rounded-full bg-[var(--loader-skeleton-block)] relative overflow-hidden shimmer flex items-center justify-center text-gray-400">
            <span className="text-[var(--loader-skeleton-img)] text-5xl">
              <RiImageCircleLine />
            </span>
          </div>
        </div>

        {/* Form Fields Skeleton - Occupies remaining space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden flex-grow">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="h-[2.3rem] rounded bg-[var(--loader-skeleton-block)] relative overflow-hidden shimmer"
            />
          ))}
        </div>

        {/* Button Skeleton - Placed at the very bottom */}
        <div className="mt-6 w-[100%] h-15 rounded bg-[var(--loader-skeleton-block)] relative overflow-hidden shimmer self-center" />
      </div>
    </>
  );
};

export default FormSkeleton;
