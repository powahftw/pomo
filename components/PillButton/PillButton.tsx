export default function PillButton({
  text,
  icon,
  onClickAction,
  className = '',
}) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className={`flex flex-row items-center justify-center text-main-color hover:text-main-color-accent
                px-6 py-4
                bg-el-bg-color rounded-full shadow-md border-solid border-b-4 border-main-color
                hover:bg-el-bg-hover-color transition-transform duration-400
                hover:translate-y-px focus:translate-y-px active:translate-y-1.5 ${className}`}
    >
      {icon}
      <div className="ml-2 font-bold text-l">{text}</div>
    </button>
  );
}
