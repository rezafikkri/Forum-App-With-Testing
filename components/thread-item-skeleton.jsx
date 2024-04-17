export default function ThreadItemSkeleton() {
  return (
    <div className="bg-white border border-gray-300 p-5 mb-1.5 rounded-xl">
      <div className="flex gap-2 items-center mb-3">
        <div className="skeleton w-5 h-5 rounded-full shrink-0" />
        <div className="skeleton h-4 w-20" />
      </div>
      <div className="skeleton h-6 w-2/3 mb-2" />
      <div className="skeleton h-4 mb-2" />
      <div className="skeleton h-4 w-1/3 mb-4" />
      <div className="flex gap-2">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-3 w-20" />
      </div>
    </div>
  );
}
