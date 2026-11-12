import { IoImagesOutline } from "react-icons/io5";

interface TransitImageProps {
  id: string;
  label: string;
  imageUrls?: string[] | string;
  onClick: (title: string, images: string[]) => void;
}

const WeightImage = ({ id, label, imageUrls, onClick }: TransitImageProps) => {
  let safeImages: string[] = [];

  // Case 1: Already an array (but filter only strings)
  if (Array.isArray(imageUrls)) {
    safeImages = imageUrls.filter(
      (url) => typeof url === "string" && url.trim() !== ""
    );
  }

  // Case 2: JSON string ("[...]")
  else if (typeof imageUrls === "string") {
    try {
      const parsed = JSON.parse(imageUrls);

      if (Array.isArray(parsed)) {
        safeImages = parsed.filter(
          (url) => typeof url === "string" && url.trim() !== ""
        );
      }
    } catch {
      safeImages = [];
    }
  }

  const previewCount = Math.min(safeImages.length, 3);

  return (
    <div className="h-62 flex flex-col rounded-xl p-1 overflow-hidden">
      <label htmlFor={id} className="block text-sm font-medium pl-1 mb-1">
        {label}
      </label>

      {/* NO IMAGES */}
      {safeImages.length === 0 ? (
        <div
          onClick={() => onClick(label, safeImages)}
          className="w-full h-full text-black text-6xl flex items-center justify-center border-2 border-gray-300 rounded-xl cursor-pointer"
        >
          <IoImagesOutline />
        </div>
      ) : (
        <div
          className="relative w-full h-52 cursor-pointer rounded-xl overflow-hidden"
          onClick={() => onClick(label, safeImages)}
          style={{ padding: "6px" }}
        >
          {safeImages.slice(0, previewCount).map((url, i) => {
            const offset = i * 10;
            return (
              <img
                key={i}
                src={url}
                alt={label}
                className="absolute rounded-lg shadow-md border-2 border-black/10"
                style={{
                  top: offset,
                  left: offset,
                  width: "calc(100% - 30px)",
                  height: "calc(100% - 30px)",
                  objectFit: "cover",
                  zIndex: 10 - i
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeightImage;
