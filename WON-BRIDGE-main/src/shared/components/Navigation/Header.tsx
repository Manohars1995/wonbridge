import ThemeSwitch from "@/shared/components/UIElements/ThemeSwitch";
import HeaderElement from "@/shared/components/UIElements/HeaderElement";
import TruckLoader from "@/components/UI/Truck-animation/Truck-animation";

const Header = () => {
  return (
    <div className="flex flex-1 justify-between items-center p-3">
      {/* Show only on medium and larger screens */}
      <div className="hidden md:block">
        <TruckLoader />
      </div>
      <div className="block md:hidden w-[100px]" />

      {/* Right-side container stays fixed */}
      <div className="flex items-center space-x-4">
        <ThemeSwitch />
        <nav className="flex items-center space-x-4">
          <HeaderElement />
        </nav>
      </div>
    </div>
  );
};

export default Header;
