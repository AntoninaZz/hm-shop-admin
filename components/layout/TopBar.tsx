"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { navLinks } from '@/lib/constants';

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownMenu(false);
      }
    };
    if (dropdownMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownMenu]);

  return (
    <div className='sticky top-0 z-2 w-full flex justify-between items-center px-8 py-4 bg-[var(--color-milk)] lg:hidden'>
      <Link href={`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}/`} target='_blank'>
        <Image src="/logo.jpg" alt="hm-shop" width={75} height={75} />
      </Link>
      <div className='flex gap-8 max-md:hidden'>
        {navLinks.map((link, i) => (
          <Link key={i} href={link.url} className={`relative flex gap-4 hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200 ${path === link.url ? 'after:w-[140%] after:absolute after:top-16 after:left-[50%] after:-translate-x-1/2 after:border-b-2' : ''}`}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className='flex gap-4 items-center'>
        <div ref={menuRef} className='relative'>
          <MenuIcon className='cursor-pointer md:hidden' onClick={() => { setDropdownMenu(!dropdownMenu); }} />
          {
            dropdownMenu && (
              <div className='absolute top-10 right-0 flex flex-col gap-8 py-3 bg-white shadow-xl rounded-md md:hidden'>
                {navLinks.map((link, i) => (
                  <Link key={i} href={link.url} onClick={() => setDropdownMenu(false)} className={`flex gap-4 px-5 py-2 hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200 ${path === link.url ? 'border-l-2' : ''}`}>
                    {link.icon}
                    <p>{link.label}</p>
                  </Link>
                ))}
              </div>
            )
          }
        </div>
        <UserButton />
      </div>
    </div>
  )
}

export default TopBar