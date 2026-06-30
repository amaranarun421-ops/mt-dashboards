'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

type Notification = {
  id: number
  title: string
  subtitle: string
  time: string
  type: 'primary' | 'success' | 'warning' | 'error' | 'info'
  read: boolean
}

const notifications: Notification[] = [
  { id: 1, title: 'Roman Joined the Team!', subtitle: 'Congratulate him on his new role', time: '2 min ago', type: 'success', read: false },
  { id: 2, title: 'New message', subtitle: 'Salma sent you a new message', time: '15 min ago', type: 'info', read: false },
  { id: 3, title: 'Bianca sent payment', subtitle: 'Check your earnings dashboard', time: '1 hour ago', type: 'success', read: false },
  { id: 4, title: 'Jolly completed tasks', subtitle: 'Assign her new tasks for this week', time: '3 hours ago', type: 'warning', read: true },
  { id: 5, title: 'John received payment', subtitle: '$230 deducted from account', time: '5 hours ago', type: 'error', read: true },
  { id: 6, title: 'Weekly report ready', subtitle: 'Your analytics summary is available', time: 'Yesterday', type: 'info', read: true },
]

const typeConfig = {
  primary: { icon: 'solar:user-check-bold-duotone', bg: 'bg-lightprimary', text: 'text-primary' },
  success: { icon: 'solar:check-circle-bold-duotone', bg: 'bg-lightsuccess', text: 'text-success' },
  warning: { icon: 'solar:danger-triangle-bold-duotone', bg: 'bg-lightwarning', text: 'text-warning' },
  error: { icon: 'solar:danger-bold-duotone', bg: 'bg-lighterror', text: 'text-error' },
  info: { icon: 'solar:bell-bing-bold-duotone', bg: 'bg-lightinfo', text: 'text-info' },
}

const Notifications = () => {
  const [notifList, setNotifList] = useState(notifications)
  const unreadCount = notifList.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifList(list => list.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifList(list => list.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='relative h-10 w-10 rounded-full hover:bg-lightprimary text-link dark:text-darklink hover:text-primary flex items-center justify-center cursor-pointer transition-colors'>
            <Icon icon='solar:bell-bing-bold-duotone' height={20} />
            {unreadCount > 0 && (
              <span className='absolute top-1.5 right-1.5 h-4 min-w-4 px-1 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center'>
                {unreadCount}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='end'
          className='w-screen sm:w-[380px] p-0 rounded-xl border border-defaultBorder bg-white dark:bg-[#111827] shadow-lg overflow-hidden'
        >
          {/* Header */}
          <div className='flex items-center justify-between px-4 py-3 border-b border-defaultBorder'>
            <div className='flex items-center gap-2'>
              <h3 className='text-base font-semibold text-link dark:text-darklink'>Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant='error' className='text-[10px] h-5 min-w-5 px-1'>{unreadCount} new</Badge>
              )}
            </div>
            <button
              onClick={markAllRead}
              className='text-xs text-primary hover:underline font-medium flex items-center gap-1'
            >
              <Icon icon='solar:check-read-bold' width={14} />
              Mark all read
            </button>
          </div>

          {/* Tab filter */}
          <div className='flex items-center gap-1 px-4 py-2 border-b border-defaultBorder'>
            <button className='px-3 py-1 rounded-md text-xs font-medium bg-lightprimary text-primary'>All</button>
            <button className='px-3 py-1 rounded-md text-xs font-medium text-muted-foreground hover:bg-lightgray dark:hover:bg-dark'>Unread</button>
            <button className='px-3 py-1 rounded-md text-xs font-medium text-muted-foreground hover:bg-lightgray dark:hover:bg-dark'>Mentioned</button>
          </div>

          {/* Notifications list */}
          <div className='max-h-[360px] overflow-y-auto'>
            {notifList.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
                <div className='h-14 w-14 rounded-2xl bg-lightgray dark:bg-dark flex items-center justify-center mb-3'>
                  <Icon icon='solar:bell-off-bold-duotone' width={28} className='text-muted-foreground' />
                </div>
                <p className='text-sm font-medium'>No notifications</p>
                <p className='text-xs text-muted-foreground mt-1'>You're all caught up!</p>
              </div>
            ) : (
              notifList.map((item) => {
                const config = typeConfig[item.type]
                return (
                  <div
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-defaultBorder last:border-b-0 cursor-pointer transition-colors hover:bg-lightgray/50 dark:hover:bg-white/5 ${!item.read ? 'bg-lightprimary/30' : ''}`}
                  >
                    {/* Icon */}
                    <div className={`h-9 w-9 rounded-lg ${config.bg} ${config.text} flex items-center justify-center shrink-0`}>
                      <Icon icon={config.icon} width={18} />
                    </div>

                    {/* Content */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-2'>
                        <p className={`text-sm ${item.read ? 'font-medium' : 'font-semibold'} text-link dark:text-darklink truncate`}>
                          {item.title}
                        </p>
                        {!item.read && <span className='h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5' />}
                      </div>
                      <p className='text-xs text-muted-foreground mt-0.5 line-clamp-1'>{item.subtitle}</p>
                      <p className='text-[10px] text-muted-foreground/70 mt-1 flex items-center gap-1'>
                        <Icon icon='solar:clock-circle-bold' width={10} />
                        {item.time}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between px-4 py-3 border-t border-defaultBorder bg-lightgray/50 dark:bg-white/5'>
            <Button variant='ghost' size='sm' className='text-xs gap-1.5 h-8'>
              <Icon icon='solar:settings-bold' width={14} />
              Settings
            </Button>
            <Button variant='outline' size='sm' className='text-xs gap-1.5 h-8' asChild>
              <Link href='/apps/chats'>
                View All
                <Icon icon='solar:alt-arrow-right-linear' width={14} />
              </Link>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Notifications
