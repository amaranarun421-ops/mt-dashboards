'use client'

import Image from "next/image";
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'} className="flex items-center gap-2">
      <Image src={"/images/logos/mtverse-logo.png"} alt="mtverse" width={28} height={28} className="rounded-lg" />
      <span className="text-lg font-bold tracking-tight text-charcoal dark:text-white lowercase">
        mt<span className="text-primary">verse</span>
      </span>
    </Link>
  )
}

export default Logo
