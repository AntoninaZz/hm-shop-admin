import React from 'react';
import Image from 'next/image';
import { navLinks } from '@/lib/constants';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

const LeftSideBar = () => {
    return (
        <div className='h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-[var(--color-milk)] text-medium shadow-xl max-lg:hidden'>
            <div className='flex justify-center'>
                <Image src="/logo.jpg" alt="hm-shop" width={75} height={75} />
            </div>
            <div className='flex flex-col gap-4'>
                {navLinks.map((link, i) => (
                    <Link key={i} href={link.url} className='flex gap-4 py-4 hover:text-[var(--color-muted-green)] transition-all ease-in-out duration-200'>
                        {link.icon}
                        <p>{link.label}</p>
                    </Link>
                ))}
            </div>
            <div className='flex gap-4 items-center'>
                <UserButton />
                <p>Edit Profile</p>
            </div>
        </div>
    )
}

export default LeftSideBar;