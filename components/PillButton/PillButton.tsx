export default function PillButton({ text, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className="w-32 bg-purple-100 hover:bg-purple-200 text-pink-600 font-bold py-2 px-4 rounded-full"
    >
      <span>{text}</span>
    </button>
  );
}
