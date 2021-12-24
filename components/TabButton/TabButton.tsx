export default function TabButton({ text, active, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className={`inline-block font-bold text-blue-500
                   w-18 py-2 px-8 focus:outline-none focus:underline
                   ${
                     active
                       ? 'bg-blue-200'
                       : 'bg-blue-100 focus:bg-blue-200 hover:bg-blue-200'
                   }`}
    >
      <span>{text}</span>
    </button>
  );
}
