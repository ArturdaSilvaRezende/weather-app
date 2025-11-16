import IconCheck from "../../../../assets/images/icon-checkmark.svg";

export default function GroupUnits({
  label,
  options,
  current,
  onSelect,
}: {
  label: string;
  options: { key: string; label: string }[];
  current: string;
  onSelect: (val: string) => void;
}) {
  return (
    <ul
      role="group"
      aria-label={label}
      className="mt-2 border-t-2 border-[var(--neutral-600)] pt-2 fadeIn"
    >
      <li className="text-[var(--neutral-300)] px-3 text-[16px]">{label}</li>
      {options.map((op) => (
        <li
          key={op.key}
          role="menuitemradio"
          aria-checked={current === op.key}
          className={`rounded-[10px] py-2 px-3 cursor-pointer text-[14px] flex items-center 
            justify-between w-full ${
              current === op.key
                ? "bg-[var(--neutral-800)]"
                : "hover:bg-[var(--neutral-800)]"
            }`}
          onClick={() => onSelect(op.key)}
        >
          <span>{op.label}</span>
          <span>
            {current === op.key && (
              <img src={IconCheck} alt="icon check" aria-hidden />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
