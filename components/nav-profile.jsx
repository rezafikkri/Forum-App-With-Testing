export default function NavProfile() {
  return (
    <details className="dropdown dropdown-end h-8">
      <summary tabIndex={0} role="button" className="btn btn-sm btn-circle avatar hover:bg-transparent border-0 ring-2 ring-primary-content ring-offset-0">
        <div className="w-7 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </summary>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li className="menu-title">Title</li>
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a className="hover:bg-red-50 hover:text-red-800">Logout</a></li>
      </ul>
    </details>
  );
}
