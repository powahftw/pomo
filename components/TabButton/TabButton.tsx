export default function TabButton({ text, active, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className={`inline-block lg:min-w-[200px] md:min-w-[160px] min-w-[120px]
                    focus:outline-none focus:underline z-10
                    ${active ? 'text-main-color-accent' : 'text-main-color'}`}
    >
      <span className="font-bold text-l">{text}</span>
    </button>
  );
}
