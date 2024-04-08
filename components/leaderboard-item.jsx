export default function LeaderboardItem() {
  return (
    <article className="flex mb-2 text-lg items-center">
      <div className="border border-gray-300 py-2 px-3 bg-white me-0.5 rounded-s-lg">
        <span>1</span>
      </div>
      <div className="flex justify-between grow border border-gray-300 py-2 px-3 bg-white rounded-e-lg">
        <div className="avatar items-center">
          <div className="w-7 rounded-full me-1.5">
            <img src="https://ui-avatars.com/api/?name=diantest&background=random" />
          </div>
          <span>Reza Fikkri</span>
        </div>
        <div className="flex">
          <span className="me-1">20</span>
          <span className="text-gray-500">score</span>
        </div>
      </div>
    </article>
  );
}
