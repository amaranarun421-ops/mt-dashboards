'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react'
import Profile from './Profile'
import Link from 'next/link'
import Notifications from './Notifications'
import SidebarLayout from '../sidebar/Sidebar'
import FullLogo from '../shared/logo/FullLogo'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import GlobalSearch from "@/app/components/search/GlobalSearch";

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [isSticky, setIsSticky] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMode = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <header
        className={`sticky top-0 z-2 bg-white dark:bg-[#0B1120] transition-shadow ${
          isSticky ? 'shadow-md' : ''
        }`}>
        <nav
          className={`rounded-none py-4 sm:ps-6 max-w-full! sm:pe-10 flex justify-between items-center px-6`}>
          {/* Mobile Toggle Icon */}
          <div
            onClick={() => {
              setIsOpen(true)
            }}
            className='px-3.5 hover:text-primary dark:hover:text-primary text-link dark:text-darklink relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent rounded-full xl:hidden flex justify-center items-center cursor-pointer'>
            <Icon icon='tabler:menu-2' height={20} width={20} />
          </div>

          <div className='block xl:hidden'>
            <FullLogo />
          </div>

          <div className='flex xl:hidden items-center gap-2'>
            <button
              onClick={() => setSearchOpen(true)}
              className='px-2.5 h-9 rounded-full hover:bg-lightprimary text-link hover:text-primary flex items-center justify-center'
              aria-label='Search'
            >
              <Icon icon='solar:magnifer-linear' width={20} />
            </button>
            <div
              className='hover:text-primary px-2 md:px-15 group focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-gray relative'
              onClick={toggleMode}>
              <span className='flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary'>
                {theme === 'light' ? (
                  <Icon icon='tabler:moon' width='20' />
                ) : (
                  <Icon
                    icon='solar:sun-bold-duotone'
                    width='20'
                    className='group-hover:text-primary'
                  />
                )}
              </span>
            </div>

            <div className='xl:block '>
              <div className='flex gap-0 items-center relative'>
                {/* Chat */}
                <Notifications />
              </div>
            </div>

            {/* Profile Dropdown */}
            <Profile />
          </div>

          <div className='hidden xl:flex items-center justify-between w-full'>
            <div className='flex items-center gap-2'>
              {/* Advanced Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className='group flex items-center gap-2 h-10 px-3 rounded-xl border border-defaultBorder bg-white dark:bg-[#111827] hover:border-primary hover:bg-lightprimary transition-colors text-sm text-link dark:text-darklink min-w-[280px]'
              >
                <Icon
                  icon='solar:magnifer-linear'
                  width={18}
                  height={18}
                  className='opacity-60 group-hover:text-primary'
                />
                <span className='opacity-70 group-hover:text-primary flex-1 text-left'>Search...</span>
                <kbd className='hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-defaultBorder bg-muted px-1.5 text-[10px] font-mono opacity-70 group-hover:border-primary/40'>
                  ⌘K
                </kbd>
              </button>
            </div>
            <div className='flex w-full justify-end items-end'>
              <div className='flex gap-0 items-center '>
                <div className='relative lg:block hidden'>
                  <Link
                    target='_blank'
                    href={'https://mtverse.io'}
                    className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primaryemphasis transition-colors dark:bg-primary dark:hover:bg-primaryemphasis'>
                    <Icon icon='solar:download-minimalistic-bold' width={16} />
                    Get Now
                  </Link>
                </div>

                {/* Dark/Light Toggle */}
                <div
                  className='hover:text-primary px-15 group focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-gray relative'
                  onClick={toggleMode}>
                  <span className='flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2   group-hover:after:bg-lightprimary'>
                    {theme === 'light' ? (
                      <Icon icon='tabler:moon' width='20' />
                    ) : (
                      <Icon
                        icon='solar:sun-bold-duotone'
                        width='20'
                        className='group-hover:text-primary'
                      />
                    )}
                  </span>
                </div>

                <div className='xl:block '>
                  <div className='flex gap-0 items-center relative'>
                    {/* Chat */}
                    <Notifications />
                  </div>
                </div>

                {/* Profile Dropdown */}
                <Profile />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side='left' className='w-64 p-0'>
          <VisuallyHidden>
            <SheetTitle>sidebar</SheetTitle>
          </VisuallyHidden>
          <SidebarLayout onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Advanced Global Search Palette (Cmd/Ctrl+K) */}
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

export default Header
