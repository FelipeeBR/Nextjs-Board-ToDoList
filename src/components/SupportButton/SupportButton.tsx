import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const SupportButton = () => {
  return (
    <div className={styles.donateContainer}>
        <Link href="/donate">
            <button>Apoiar</button>
        </Link>
    </div>
  )
}

export default SupportButton;