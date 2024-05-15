import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  return (
    <>
      <div className="w-full bg-slate-700 fixed z-30">
        <ul className="flex justify-between text-white p-4">
          <Link href="/">
            <li><Image src='/images/logo.png' alt="Logo" height={500} width={500} className="w-56"/></li>
          </Link>
          <Link href="/Login">
            <li><button className="bg-red-700 text-white p-2 font-bold hover:text-orange-700 hover:bg-white">LOGIN</button></li>
          </Link>
        </ul>
      </div>
    </>
  );
}
