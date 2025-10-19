"use client";
import Link from "next/link";

export const SiteMenu = () => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <ul className="flex gap-8 text-lg items-center justify-center font-semibold">
        <li>
          <Link href={"#demos"}>Demos</Link>
        </li>
        <li>
          <Link href={"#price"}>Price</Link>
        </li>
        <li>
          <Link href={"#"}>Features</Link>
        </li>
        <li>
          <Link href={"#"}>Documantation</Link>
        </li>
      </ul>
    </div>
  );
};
