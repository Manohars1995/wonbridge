import { IoImageOutline } from "react-icons/io5";

const SkeletonLoader = ({ count }: { count: number }) => {
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

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="h-fit w-full rounded-xl bg-[var(--loader-skeleton-bg)] p-3"
          >
            <div className="flex space-x-4">
              <div className="size-25 relative overflow-hidden rounded-2xl bg-[var(--loader-skeleton-block)] shimmer flex justify-center items-center">
                <span className="text-[var(--loader-skeleton-img)] text-3xl">
                  <IoImageOutline />
                </span>
              </div>
              <div className="flex-1 space-y-4 py-2">
                <div className="h-3 w-[70%] relative overflow-hidden rounded bg-[var(--loader-skeleton-block)] shimmer"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-3 relative overflow-hidden rounded bg-[var(--loader-skeleton-block)] shimmer"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="mt-3 h-4 relative overflow-hidden rounded bg-[var(--loader-skeleton-block)] shimmer"></div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonLoader;
