"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import { navLinks } from '@/lib/constants';

const LeftSideBar = () => {
    const path = usePathname();
    return (
        <div className='h-screen left-0 top-0 sticky py-7 flex flex-col justify-between gap-8 bg-[var(--color-milk)] text-medium shadow-xl max-lg:hidden'>
            <div className='flex flex-col gap-5'>
                <div className='flex justify-center'>
                    <Link href={`${process.env.ECOMMERCE_STORE_URL}/`}>
                        <Image src="/logo.jpg" alt="hm-shop" width={75} height={75} />
                    </Link>
                </div>
                <div className='flex flex-col gap-2'>
                    {navLinks.map((link, i) => (
                        <Link key={i} href={link.url} className={`flex gap-4 px-10 py-4 hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200 ${path === link.url ? 'border-r-2' : ''}`}>
                            {link.icon}
                            <p>{link.label}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex gap-4 px-10 items-center'>
                <UserButton />
                <p>Edit Profile</p>
            </div>
        </div>
    )
}

export default LeftSideBar;