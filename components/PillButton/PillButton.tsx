export default function PillButton({ text, icon, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className="flex flex-row items-center text-blue-500 hover:text-blue-600
                px-4 py-2 hover:bg-blue-200
                bg-blue-100 rounded-full shadow-md border-solid border-b-4 border-blue-500
                transition-transform duration-400 transform
                hover:translate-y-px focus:translate-y-px active:translate-y-1.5"
    >
      {icon}
      <div className="ml-2 font-bold">{text}</div>
    </button>
  );
}
