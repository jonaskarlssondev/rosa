import Link from "next/link";
import React from "react";

const Header: React.FC<{}> = ({}) => {
  return (
    <header className="w-screen h-12 p-2 flex justify-between">
        <Link href="/">
          <a className="text-2xl">ROSA</a>
        </Link>
        <nav className="flex">
          <Link href="/">
            <a className="mt-1 mr-4">analyse</a>
          </Link>
          <Link href="/about">
            <a className="mt-1 mr-4">about</a>
          </Link>
        </nav>
      </header>
  );
};

export default Header;