import IconRetry from "../../assets/images/icon-retry.svg";
import IconError from "../../assets/images/icon-error.svg";

export default function SomethingWentWrong({
  handleRetry,
  disabled = false,
}: {
  handleRetry: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <img src={IconError} alt="icon error" className="w-10" />
      <h1
        className="text-5xl text-center font-[600] leading-tight mt-7 mb-4"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        Something Went Wrong
      </h1>

      <p className="text-[var(--neutral-200)] mb-4 w-[35%] text-center">
        We Couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>

      <button
        className="flex bg-[var(--neutral-800)] hover:bg-[var(--neutral-700)] 
      px-5 py-2 rounded-[10px] cursor-pointer gap-3 transition duration-300 ease-in-out"
        onClick={handleRetry}
        disabled={disabled}
        aria-busy={disabled}
      >
        <img src={IconRetry} alt="icon retry" />
        <span>Retry</span>
      </button>
    </div>
  );
}
