export default function PillButton({ text, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className="inline-block font-bold rounded-md focus:outline-black
                 w-32 shadow-lg
                 transition-transform duration-200 transform
                 hover:translate-y-px focus:translate-y-px active:translate-y-1.5
               bg-blue-100 hover:bg-blue-200 text-blue-500 border-b-4 border-blue-500
                 py-2 px-4"
    >
      <span>{text}</span>
    </button>
  );
}
