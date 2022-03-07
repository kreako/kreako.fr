import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex flex-row bg-gradient-to-br from-sky-500 to-sky-600 items-center space-x-6">
      <div className="ml-2 my-2 flex-none">
        <Link href="/">
          <a>
            <Image
              src="/avatar.png"
              alt="Avatar"
              width={48}
              height={48}
              className="rounded-full bg-white"
            />
          </a>
        </Link>
      </div>
      <div className="text-white uppercase tracking-wide text-xs font-semibold">
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </div>
      <div className="text-white uppercase tracking-wide text-xs font-semibold">
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>
      <div>
        <Link href="/search">
          <a>
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-200 hover:text-white transition-colors duration-150"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </a>
        </Link>
      </div>
    </header>
  )
}