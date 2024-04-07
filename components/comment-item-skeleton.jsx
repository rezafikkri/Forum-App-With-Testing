export default function CommentItemSkeleton() {
  return (
    <div className="bg-white border border-gray-300 p-4 mb-1.5 first:rounded-t-lg last:rounded-b-lg">
      <div className="flex gap-2 items-center mb-2">
        <div className="skeleton w-7 h-7 rounded-full shrink-0" />
        <div>
          <div className="skeleton h-4 w-20 mb-1" />
          <div className="skeleton h-3 w-10" />
        </div>  
      </div>

      <div className="skeleton h-4 w-full mb-1.5" />
      <div className="skeleton h-4 w-10/12 mb-1.5" />
      <div className="skeleton h-4 w-10/12 mb-4" />

      <div className="flex gap-2">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-3 w-20" />
      </div>
    </div>
  );
}
