import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-gradient-to-b from-neutral-100 via-neutral-100 to-neutral-300">
      <h1 className="text-[7rem] font-bold tracking-wide text-neutral-800 stroke-neutral-800 stroke-2">
        Notes
      </h1>
      <div className="flex gap-3 w-[15rem] items-center justify-center">
        <Link className="grow rounded-xl border-2 border-neutral-800" 
              href="https://github.com/rafmillan" target="_blank">
          <button className="w-full h-full flex justify-center items-center py-2 px-3 text-neutral-800 font-semibold">
            Github
          </button>
        </Link>
        <Link className="grow rounded-xl border-2 border-neutral-800 bg-neutral-800 text-neutral-100"
              href="doc/new">
          <button className="w-full h-full flex justify-center items-center py-2 px-3 font-semibold">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
