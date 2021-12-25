export default function TabButton({ text, active, onClickAction }) {
  return (
    <button
      onClick={onClickAction}
      type="button"
      className={`inline-block font-bold text-main-color
                   w-18 py-2 px-8 focus:outline-none focus:underline
                   ${
                     active
                       ? 'bg-el-bg-hover-color'
                       : 'bg-el-bg-color focus:bg-el-bg-hover-color hover:bg-el-bg-hover-color'
                   }`}
    >
      <span>{text}</span>
    </button>
  );
}
