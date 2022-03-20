export default function StatsDisplay({ sessionCompleted }) {
  return (
    <>
      {sessionCompleted > 0 && (
        <span className="border-solid border-2 border-main-color absolute bottom-6 left-6 bg-el-bg-color px-6 py-3 shadow-xl rounded-2xl text-main-color">
          {sessionCompleted} session{sessionCompleted > 1 ? 's' : ''} completed!
        </span>
      )}
    </>
  );
}
