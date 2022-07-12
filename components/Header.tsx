import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const name = 'Rômulo Takaoka'

export default function Header() {
  return (
    <>
      <div className="p-4 max-w-7xl h-4 mx-auto justify-between">
        <ThemeToggle />
      </div>

      <header
        className="p-4 max-w-7xl mx-auto flex justify-between"
      >
        <p className="text-2xl font-bold dark:text-white uppercase hover:underline">
          <Link href={"/"}>{name}</Link>
        </p>


        <ul className="flex gap-4 font-bold">
          <li className="hover:underline">
            <Link href={"/"} className="text-white">Home</Link>
          </li>
          <li className="hover:underline">
            <Link href={"/about"} className="text-white">About</Link>
          </li>
          <li className="hover:underline">
            <Link href={"/contact"} className="text-white">Contact</Link>
          </li>
        </ul>

      </header>


    </>
  )
}