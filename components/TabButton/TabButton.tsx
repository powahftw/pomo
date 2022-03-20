export default function TabButton({ text, active, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className={`inline-block font-bold min-w-[180px]
                    focus:outline-none focus:underline z-10
                    ${active ? 'text-main-color-accent' : 'text-main-color'}`}
    >
      <span>{text}</span>
    </button>
  );
}
