import Link from 'next/link';

export default function ThreadItem() {
  return (
    <article className="bg-white border border-gray-300 rounded-xl p-5 first:rounded-bl-none first:rounded-br-none last:rounded-tr-none last:rounded-tl-none mb-1.5">
      <Link href="/threads">
        <div className="hover:cursor-pointer mb-3">
            <div className="avatar items-center text-sm text-gray-500">
              <div className="w-5 rounded-full me-1">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              <span>Adelina</span>
            </div>
          
          <h2 className="text-xl font-bold leading-tight">How many media post news per-today?</h2>
          <p className="text-gray-700 leading-snug">Input groups include support for custom selects and custom file inputs. Browser default versi...</p>
        </div>
      </Link>
      <div className="flex gap-3 text-gray-500 text-sm font-light">
        <div>
          <i className="bi bi-hash" />
          <span>General</span>
        </div>
        <div className="me-4">
          <i className="bi bi-clock me-1" />
          <time>19 minutes ago</time>
        </div>

        <button type="button" className="text-primary">
          <i className="bi bi-arrow-up-circle-fill me-1" />
          <span>10</span>
        </button>
        <button type="button">
          <i className="bi bi-arrow-down-circle me-1" />
          <span>20</span>
        </button>

        <div>
          <i className="bi bi-chat me-1" />
          <span>30</span>
        </div>
      </div>
    </article>
  );
}
