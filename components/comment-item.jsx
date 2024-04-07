export default function CommentItem() {
  return (
    <article className="bg-white border border-gray-300 p-4 mb-1.5 first:rounded-t-lg last:rounded-b-lg">
      <div className="mb-4">
        <div className="avatar items-center text-sm text-gray-600 mb-2">
          <div className="w-7 rounded-full me-2">
            <img src="https://ui-avatars.com/api/?name=diantest&background=random" alt="reza fikkri" />
          </div>
          <div className="!aspect-auto">
            <span className="block leading-none">Reza Fikkri</span>
            <time className="text-gray-500 text-xs">19 minutes ago</time>
          </div>
        </div>

        <div className="prose text-gray-800 leading-normal max-w-none">Curious which components explicitly require our JavaScript and Popper? If you’re at all unsure about the general page structure, keep reading for an example page template.</div>
      </div>
      <div className="flex font-light text-gray-500 gap-5 text-sm">
        <button
          className="text-primary"
          type="submit"
        >
          <i className="bi bi-arrow-up-circle-fill me-1" />
          <span>10</span>
        </button>
        <button
          type="button"
        >
          <i className="bi bi-arrow-down-circle me-1" />
          <span>0</span>
        </button>
      </div>
    </article>
  );
}
