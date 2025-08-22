type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className={`sr-only peer ${className || ""}`}
        {...props}
      />
      <div
        className={
          "w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200 relative"
        }
      >
        <span
          className={
            "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-5"
          }
        />
      </div>
    </label>
  );
}
