"use client"
import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {redirect, useParams} from 'next/navigation';
import firebase  from '@/services/firebaseConnection';
import {format} from 'date-fns';
import { FiCalendar } from 'react-icons/fi';


const PageDetailsId = () => {
    const {data: session} = useSession();
    const [taskList, setTaskList] = useState<any>([]);
    const { id } = useParams();

    useEffect(() => {
        const getTasks = async () => {
            const dataTask = await firebase.firestore().collection('tarefas')
            .doc(String(id))
            .get()
            .then((snapshot: any)=> {
                const data = {
                    id: snapshot.id,
                    created: snapshot.data().created,
                    createdFormated: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
                    tarefa: snapshot.data().tarefa,
                    userId: snapshot.data().userId,
                    nome: snapshot.data().nome
                }
                return data;
            })
            .catch(()=> {
                return {};
            })
            if(Object.keys(dataTask).length === 0){
                redirect("/board");
            }
            setTaskList(dataTask);   
        }
        getTasks()
    },[])

    return (
        <>
            {(session as any)?.vip ? (
                <>
                    <article className={styles.container}>
                        <div className={styles.actions}>
                            <div>
                                <FiCalendar size={30} color="#FFF"/>
                                <span>Tarefa Criada:</span>
                                <time>{taskList.createdFormated}</time>
                            </div>
                        </div>
                        <p>{taskList.tarefa}</p>
                    </article>
                </>
            ): (
               redirect("/")
            )}
        </>
    )
}

export default PageDetailsId;


