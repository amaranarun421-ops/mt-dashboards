'use client'

import { useEffect, useState } from 'react'
import Header from './layout/header/Header'
import Sidebar from './layout/sidebar/Sidebar'
import NavigationProgress from '@/app/components/navigation/NavigationProgress'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <div className='flex w-full min-h-screen'>
        <div className='page-wrapper flex w-full'>
          {/* Header/sidebar — client-only to avoid Radix Collapsible SSR/CSR mismatch */}
          <div className='xl:block hidden' suppressHydrationWarning>
            {mounted && <Sidebar />}
          </div>

          <div className='body-wrapper w-full'>
            {/* Top Header  */}
            <Header />
            {/* Body Content  */}
            <div className="bg-lightgray dark:bg-[#111827] mr-3 rounded-3xl min-h-[90vh] relative overflow-hidden">
              <NavigationProgress />
              <div className={`container mx-auto px-6 py-30`}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
