import Link from 'next/link'
import Image from 'next/image'

import { ThemeToggle } from '@/components/theme-toggle'

export default function Navbar() {
  return (
    <div
      className={`w-full bg-background min-h-16 flex justify-between items-center border-b p-4 px-8`}
    >
      <Link href="/" className="flex flex-row gap-4 items-center">
        <Image
          src="/shark.svg"
          alt="shark Logo"
          width={64}
          height={40}
          priority
        />
        <span className="text-2xl font-bold ">Shark</span>
      </Link>
      <ThemeToggle />
    </div>
  )
}
