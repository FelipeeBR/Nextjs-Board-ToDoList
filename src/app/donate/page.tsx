"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import styles from './styles.module.scss';
import { PayPalButtons } from '@paypal/react-paypal-js';
import firebase from '@/services/firebaseConnection';
import Image from 'next/image';
import rocket from '../../../public/rocket.svg';

const Donate = () => {
    const {data: session} = useSession();
    const userId = (session as any)?.id;
    const [vip, setVip] = useState(false);

    async function handleSaveDonate() {
        await firebase.firestore().collection("users")
        .doc(userId)
        .set({
            donate: true,
            lastDonate: new Date(),
            image: session?.user?.image
        })
        .then(()=>{
            setVip(true);
        })
    }

    return (
        <>
            {session ? (
                <>
                    <main className={styles.container}>
                        <Image src={rocket} alt="Seja Apoiador" />

                        {vip && (
                            <div className={styles.vip}>
                                <img src={session.user?.image || ''} alt="" />
                                <span>Parabéns você é um novo apoiador!</span>
                            </div>
                        )}

                        <h1>Seja um apoiador deste projeto 🏆</h1>
                        <h3>Contribua com apenas <span>R$ 1,00</span></h3>
                        <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>
                        <PayPalButtons createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount:{
                                        value: '1'
                                    }
                                }]
                            })
                        }}
                        onApprove={(data, actions) => {
                            return actions.order!.capture().then(function(details){
                                console.log("Compra Aprovada: " + details.payer.name?.given_name)
                                handleSaveDonate();
                            })
                        }}
                        />
                    </main>
                </>
            ) : (
                redirect("/")
            )}
        </>
    )
}

export default Donate;