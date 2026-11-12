interface InputElementsProps {
  label: string;
  value: string;
  onChange: () => void;
  styles?: string;
}

export const InputTag = ({ label, value, onChange, styles }: InputElementsProps) => {
  return (
    <div className={`h-[4.5rem] mt-1 ${styles}`}>
      <label className="block text-sm font-medium pl-2 mb-1">{label}</label>
      <input
        type="text"
        className={`w-full h-[2.4rem] px-2 py-2 border border-gray-300 rounded-lg focus:outline-none ${styles}`}
        placeholder="Enter text here"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};


