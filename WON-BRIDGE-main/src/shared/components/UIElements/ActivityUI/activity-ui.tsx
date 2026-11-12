// Card Component
export const Card = ({ children, className = "" }: any) => {
  return (
    <div className={`bg-white rounded-xl shadow p-4 ${className}`}>
      {children}
    </div>
  );
};

// CardContent Component
export const CardContent = ({ children, className = "" }: any) => {
  return <div className={className}>{children}</div>;
};

// Badge Component
export const Badge = ({ children, className = "" }: any) => {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
};

// Input Component
export const Input = ({ className = "", ...props }: any) => {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm w-full ${className}`}
    />
  );
};

// Button Component
export const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}: any) => {
  const base = "px-4 py-2 rounded-md text-sm font-medium";

  const styles: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
  };

  return (
    <button {...props} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};
