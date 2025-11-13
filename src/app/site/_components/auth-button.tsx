"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export const AuthButton = () => {
  const { user } = useUser();
  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-3 items-center">
        {user ? (
          <UserButton />
        ) : (
          <div className="flex gap-3 items-center">
            <Link
              href={"/agency/sign-in"}
              className="text-white bg-theme px-4 py-2 rounded-lg font-semibold hover:bg-theme/80"
            >
              Sign In
            </Link>
            <Link
              href={"/agency/sign-up"}
              className="text-white bg-theme px-4 py-2 rounded-lg font-semibold hover:bg-theme/80"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
