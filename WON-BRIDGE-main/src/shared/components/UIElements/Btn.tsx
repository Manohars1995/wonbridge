interface propVals {
  children: React.ReactNode;
  styles: string;
  onAdd: (e: any) => void;
}

const Button = ({ children, styles, onAdd }: propVals) => {
  return (
    <button
      onClick={onAdd}
      className={`h-10 w-full bottom-0 px-3 rounded-lg border cursor-pointer ${styles}`}
    >
      {children}
    </button>
  );
};

export default Button;
