'use client'

import CardBox from '@/app/components/shared/CardBox'
import { JSX } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'

interface BreadCrumbType {
  subtitle?: string
  items?: { to?: string; title: string }[]
  title: string
  children?: JSX.Element
}

const BreadcrumbComp = ({ items, title }: BreadCrumbType) => {
  const crumbs = items && items.length > 0 ? items : [{ to: '/', title: 'Home' }, { title }]
  return (
    <>
      <CardBox
        className={`mb-6 py-4 bg-lightprimary dark:bg-darkinfo overflow-hidden rounded-xl border-none !shadow-none dark:!shadow-none`}>
        <div className='items-center grid grid-cols-12 gap-6'>
          <div className='col-span-10'>
            <h4 className='font-semibold text-xl text-customdark mb-3'>
              {title}
            </h4>
            <ol
              className='flex items-center whitespace-nowrap flex-wrap'
              aria-label='Breadcrumb'>
              {crumbs.map((item, idx) => {
                const isLast = idx === crumbs.length - 1
                return (
                  <li key={idx} className='flex items-center'>
                    {idx > 0 && (
                      <Icon
                        icon='solar:alt-arrow-right-linear'
                        width={14}
                        className='mx-2 opacity-50'
                      />
                    )}
                    {isLast || !item.to ? (
                      <span
                        className='text-sm text-primary font-medium leading-none'
                        aria-current='page'>
                        {item.title}
                      </span>
                    ) : (
                      <Link
                        className='opacity-80 text-sm text-charcoal dark:text-darklink leading-none hover:text-primary transition-colors'
                        href={item.to}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
          <div className='col-span-2 flex justify-center -mb-10'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/images/breadcrumb/ChatBc.png'
              alt=''
              className='md:-mb-[31px] -mb-4 max-w-[140px] h-auto'
              width={140}
              height={150}
            />
          </div>
        </div>
      </CardBox>
    </>
  )
}

export default BreadcrumbComp
