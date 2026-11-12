import { useState } from "react";

const CameraForm = () => {
  const [activeCamara, setActiveCamera] = useState<string>("webcam");

  const webCam = () => {
    return (
      <div className="h-60 p-3 flex flex-col gap-2 rounded-2xl shadow-sm bg-[var(--background-default)]">
        <div className="flex gap-3 ">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="camera"
              value={activeCamara}
              className="peer hidden"
              onChange={() => setActiveCamera("webcam")}
            />
            <div className="w-6 h-6 border-4 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-100 rounded-xl flex items-center justify-center text-sm font-medium transition"></div>
          </label>
          <h3>Web Cam</h3>
        </div>

        <div className="w-full h-full rounded-xl overflow-hidden">
          <img src="https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=600" alt="CCTV IMAGE" className="h-full w-full " />
        </div>
      </div>
    );
  };

  const cctv = () => {
    return (
      <div className="h-60 p-3 flex flex-col gap-2 rounded-2xl shadow-sm bg-[var(--background-default)]">
        <div className="flex gap-3 ">
          <label className="cursor-pointer ">
            <input
              type="radio"
              name="camera"
              value={activeCamara}
              className="peer hidden"
              onChange={() => setActiveCamera("cctv")}
            />
            <div className="w-6 h-6 border-4 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-100 rounded-xl flex items-center justify-center text-sm font-medium transition"></div>
          </label>

          <h3>CCTV</h3>
        </div>
        <div className="w-full h-full rounded-xl overflow-hidden">
          <img src="https://images.pexels.com/photos/2253573/pexels-photo-2253573.jpeg?auto=compress&cs=tinysrgb&w=600" alt="CCTV IMAGE" className="h-full w-full" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      {webCam()}
      {cctv()}
    </div>
  );
};

export default CameraForm;
