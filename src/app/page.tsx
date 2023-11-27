"use client"
import type { Metadata } from 'next';
import styles from './page.module.scss';
import firebase from '@/services/firebaseConnection';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import boarder from '../../public/board-user.svg';


/*export const metadata: Metadata = {
  title: 'Bem Vindo !',
  description: 'Crie suas tarefas de forma simples e fácil.',
}*/

export default function Home() {

  const [donaters, setDonaters] = useState<any>([]);

  useEffect(() => {
    async function getDonaters() {
      const donaters = await firebase.firestore().collection('users').get();
      const data = donaters.docs.map(u => {
        return{
          id: u.id,
          ...u.data(),
        }
      });
      setDonaters(data);
      console.log(data);
    }
    getDonaters()
  },[])

  return (
    <main className={styles.contentContainer}>
      <Image src={boarder} alt="Ferramenta" />
      <section className={styles.callToAction}>
        <h1>Uma Ferramenta para seu dia Escreva, planeje e organize-se...</h1>
        <p>
          <span>100% Gratuita</span> e online.
        </p>
      </section>
      {donaters.length !== 0 && <h3>Apoiadores:</h3>}
      <div className={styles.donaters}>
        {donaters.map((item: any) => (
          <img key={item.id} src={item.image} alt="Vips" />
        ))}
      </div>
    </main>
  )
}


