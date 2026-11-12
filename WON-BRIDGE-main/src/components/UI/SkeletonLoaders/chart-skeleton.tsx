const ChartSkeleton = () => {
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

      <div className="w-full h-full">
        <div className="h-full w-full rounded-xl bg-transparent flex-1 p ">
          <div className="flex flex-col h-full w-full space-x-4">
            <div className="flex w-full justify-between items-center">
              <div className="h-7 w-30 relative overflow-hidden bg-[var(--loader-skeleton-block)] shimmer flex justify-center items-center rounded-md "></div>
              <div className="h-7 w-30 relative overflow-hidden bg-[var(--loader-skeleton-block)] shimmer flex justify-center items-center rounded-md"></div>
            </div>

            <div className="flex-1 space-y-4 mt-2">
              <div className="h-full w-full relative overflow-hidden rounded-lg bg-[var(--loader-skeleton-block)] shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartSkeleton;
