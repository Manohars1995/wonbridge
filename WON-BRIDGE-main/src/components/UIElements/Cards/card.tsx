interface CardProps {
  id: string;
  view: (id: string) => void;
  image?: string;
  title?: string;
  sub1?: { label?: string; value?: string };
  sub2?: { label?: string; value?: string };
  sub3?: { label?: string; value?: string };
  styles?: string;
  btns?: {
    icon: React.ReactNode;
    onClick: () => void;
    tooltip?: string;
  }[];
  imageAlt: string;
}

const Card = ({
  id,
  view,
  image,
  title,
  sub1,
  sub2,
  sub3,
  styles = "bg-[var(--tile-bg)] hover:bg-[var(--tile-hover-bg)]",
  btns = [],
  imageAlt = ""
}: CardProps) => {
  return (
    <div
      onClick={() => {
        view(id);
      }}
      className={`${styles} relative min-w-70 h-fit flex flex-col flex-1 gap-2 rounded-xl shadow p-2 cursor-pointer`}
    >
      <div className="flex gap-2">
        <div className="w-24 h-24 bg-[var(--background-secondary)] shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image || ""}
              alt={imageAlt || ""}
              className="object-cover h-full w-full "
            />
          ) : (
            <span className="text-4xl font-bold text-[var(--tile-text)]">
              {title?.substring(0, 1).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex flex-col text-[var(--tile-text)] w-full min-w-0">
          <span className="font-bold italic">{title?.toUpperCase()}</span>
          <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
            {sub1?.label}: {sub1?.value || "N/A"}
          </p>
          <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
            {sub2?.label}: {sub2?.value || "N/A"}
          </p>
          <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
            {sub3?.label}: {sub3?.value || "N/A"}
          </p>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex flex-col gap-1 ">
        {btns?.map((btn, index) => (
          <button
            type="button"
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              btn?.onClick();
            }}
            className="p-1 rounded bg-[var(--tile-btn)] hover:bg-[var(--tile-btn-hover)] cursor-pointer text-sm"
            title={btn?.tooltip}
          >
            {btn?.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Card;
