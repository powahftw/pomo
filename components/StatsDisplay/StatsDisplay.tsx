export default function StatsDisplay({ sessionCompleted }) {
  return (
    <>
      {sessionCompleted > 0 && (
        <span className="absolute bottom-4 right-4 bg-white px-4 py-2 shadow-2xl">
          {sessionCompleted} session{sessionCompleted > 1 ? 's' : ''} completed!
        </span>
      )}
    </>
  );
}
