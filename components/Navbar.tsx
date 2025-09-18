import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { LogOut, Search, Settings, UserPen } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-0 py-3 max-w-7xl  mx-auto md:mx-10">
        {/* Left side - Sidebar trigger */}
        <div className="flex items-center">
          <SidebarTrigger className='mr-4'/>
          <Image src="/Airtable_Logo.png" width={100} height={50} alt="Logo" className='md:w-35' />
        </div>
        
        {/* Middle - Search bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Right side - You can add more items here */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/Screenshot 2024-01-10 191223.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserPen />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      
    </nav>

  )
}

export default Navbar