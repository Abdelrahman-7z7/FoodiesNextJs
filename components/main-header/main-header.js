import Link from 'next/link'
import Image from 'next/image'


import logoImg from '@/assets/logo.png'
import classes from './main-header.module.css'
import MainHeaderBackground from '@/components/main-header/main-header-background'
import NavLink from './nav-link';

export default function MainHeader(){
    

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
                            <NavLink href='/meals'>Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href='/community'>Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>

            </header>
        </>
    ) 
}

