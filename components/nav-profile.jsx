'use client';

import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { asyncUnsetAuthUser } from '@/lib/authUser/action';

export default function NavProfile() {
  const authUser = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  function handleSignOut() {
    dispatch(asyncUnsetAuthUser());
  }

  return (
    <div className="dropdown dropdown-end h-8">
      <div tabIndex={0} role="button" className="btn btn-sm btn-circle avatar bg-transparent hover:bg-transparent border-0 ring-2 ring-primary-content ring-offset-0">
        <div className="w-7 rounded-full">
          {authUser ? (
            <Image alt={authUser.name} src={authUser.avatar} width={28} height={28} />
          ) : (
            <div className="skeleton w-7 h-7 rounded-full" />
          )}
        </div>
      </div>
      <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li className="menu-title">
          {authUser ? `Signed in as ${authUser.email}` : (
            <div className="skeleton h-4 w-full" />
          )}
        </li>
        <li>
          <button
            type="button"
            className="hover:bg-red-50 hover:text-red-800 active:!bg-red-600 active:!text-gray-50"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
