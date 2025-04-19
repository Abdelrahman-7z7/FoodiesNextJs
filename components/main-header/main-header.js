'use client';

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import logoImg from '@/assets/logo.png'
import classes from './main-header.module.css'
import MainHeaderBackground from '@/components/main-header/main-header-background'

export default function MainHeader(){
    //it is providing the accessibility of the current used path to control some states
    const path = usePathname();
    
    return(
        <>    
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                {/* priority here is making the loading for the image at the top priority to be loaded first */}
                    <Image src={logoImg} alt="A plate with food on it" priority></Image>
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <Link href="/meals" className={path.startsWith('/meals')? classes.active : undefined}>Browse Meals</Link>
                        </li>
                        <li>
                            <Link href="/community" className={path === '/community' ? classes.active : undefined}>Foodies Community</Link>
                        </li>
                    </ul>
                </nav>

            </header>
        </>
    ) 
}

