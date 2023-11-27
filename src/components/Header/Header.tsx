import React from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import SignInButton from '../SignInButton/SignInButton';
import Image from 'next/image';
import logo from '../../../public/logo.svg'

const Header = () => {
  return (
    <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href='/'>
                <Image src={logo} alt="Logo" />
            </Link>
            <nav>
                <Link href='/'>
                    Home
                </Link>
                <Link href='/board'>
                    Meu Board
                </Link>
            </nav>

            <SignInButton/>
        </div>
    </header>
  )
}

export default Header