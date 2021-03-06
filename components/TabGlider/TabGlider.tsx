export default function TabGlider({ activeTab }) {
  const translateMapping = {
    0: 'translate-x-0',
    1: 'translate-x-full',
    2: 'translate-x-200',
  };
  return (
    <div
      className={`absolute lg:min-w-[200px] md:min-w-[160px] min-w-[120px] h-10 transition-all duration-500 top-0 bottom-0 my-auto ${translateMapping[activeTab]}`}
    >
      <div className=" min-h-full mx-4 bg-el-bg-hover-color rounded-full"></div>
    </div>
  );
}
