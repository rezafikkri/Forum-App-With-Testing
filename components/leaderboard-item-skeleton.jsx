export default function LeaderboardItemSkeleton() {
  return (
    <div className="flex mb-2 text-lg items-center">
      <div className="border border-gray-300 py-3 px-3 bg-white me-0.5 rounded-s-lg">
        <div className="skeleton h-5 w-2" />
      </div>
      <div className="flex justify-between grow border border-gray-300 py-2 px-3 bg-white rounded-e-lg">
        <div className="skeleton h-7 w-32" />
        <div className="skeleton h-7 w-20" />
      </div>
    </div>
  );
}
