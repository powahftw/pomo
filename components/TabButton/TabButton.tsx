export default function TabButton({ text, active, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className={`inline-block font-bold text-pink-600
                   w-18 py-2 px-8 focus:outline-none 
                   ${
                     active
                       ? 'bg-purple-300'
                       : 'bg-purple-100 focus:bg-purple-200 hover:bg-purple-200'
                   }`}
    >
      <span>{text}</span>
    </button>
  );
}
