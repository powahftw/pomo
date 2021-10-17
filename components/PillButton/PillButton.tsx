export default function PillButton({ text, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className="inline-block font-bold rounded-md focus:outline-black
                 w-32 shadow-lg
                 transition-transform duration-200 transform
                 hover:translate-y-px focus:translate-y-px active:translate-y-1.5
               bg-purple-100 hover:bg-purple-200 text-pink-600 border-b-4 border-pink-900
                 py-2 px-4"
    >
      <span>{text}</span>
    </button>
  );
}
