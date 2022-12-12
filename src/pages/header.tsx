import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-screen h-12 p-2 flex justify-between">
      <Link href="/" className="text-2xl">
        ROSA
      </Link>
      <nav className="flex">
        <Link href="/" className="mt-1 mr-4">
          analyse
        </Link>
        <Link href="/about" className="mt-1 mr-4">
          about
        </Link>
      </nav>
      </header>
  );
};

export default Header;