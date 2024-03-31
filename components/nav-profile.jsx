'use client';

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { asyncUnsetAuthUser } from "@/lib/authUser/action";

export default function NavProfile() {
  const authUser = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  function handleSignOut() {
    dispatch(asyncUnsetAuthUser());
  }

  return (
    <details className="dropdown dropdown-end h-8">
      <summary tabIndex={0} role="button" className="btn btn-sm btn-circle avatar hover:bg-transparent border-0 ring-2 ring-primary-content ring-offset-0">
        <div className="w-7 rounded-full">
          {authUser ? (
            <img alt={authUser.name} src={authUser.avatar} />
          ) : (
            <div className="skeleton w-7 h-7 rounded-full"></div>
          )}
        </div>
      </summary>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li className="menu-title">
          {authUser ? `Signed in as ${authUser.email}` : (
            <div className="skeleton h-4 w-full"></div>
          )}
        </li>
        <li>
          <button
            type="button"
            className="hover:bg-red-50 hover:text-red-800"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </details>
  );
}
