"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from 'react-icons/fi';
import SupportButton from '@/components/SupportButton/SupportButton';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {redirect} from 'next/navigation';
import firebase from '@/services/firebaseConnection';
import { format, formatDistance } from 'date-fns';
import {ptBR} from 'date-fns/locale';

type TaskList = {
    id: string;
    created: string | Date;
    createdFormated?: string;
    tarefa: string;
    userId: string;
    nome: string;
}


const Board = () => {
    const {data: session} = useSession();
    //const myId = (session as any)?.id;

    const [input, setInput] = useState("");
    const [taskList, setTaskList] = useState<any>([]);

    const [taskEdit, setTaskEdit] = useState<TaskList | null>(null);

    useEffect(() => {
      const getTasks = async () => {
        try {
          const tasksSnapshot = await firebase.firestore().collection('tarefas')
          .where('userId', '==', (session as any)?.id)
          .orderBy('created', 'asc').get();
          const tasksData = tasksSnapshot.docs.map(u => ({
            id: u.id,
            createdFormated: format(u.data().created.toDate(), 'dd MMMM yyyy'),
            ...u.data(),
          }));
          setTaskList(tasksData);
        } catch (error) {
          console.error('Erro ao obter as tarefas:', error);
        }
      };
      
      getTasks();
    }, []);

    async function handleAddTask(e: FormEvent){
        e.preventDefault()
        
        if(input === ''){
            alert("Adicione alguma tarefa!");
            return;
        }

        if(taskEdit) {
            await firebase.firestore().collection('tarefas')
            .doc(taskEdit.id)
            .update({
                tarefa: input
            })
            .then(() => {
                let data = taskList;
                let taskIndex = taskList.findIndex((item:any) => item.id === taskEdit.id);
                data[taskIndex].tarefa = input;

                setTaskList(data);
                setTaskEdit(null);
                setInput("");
            })

            return;
        }

        await firebase.firestore().collection('tarefas')
        .add({
            created: new Date(),
            tarefa: input,
            userId: (session as any)?.id,
            nome: session?.user?.name
        })
        .then((doc) => {
            console.log('Cadastrado com sucesso!');
            let data = {
                id: doc.id,
                created: new Date(),
                createdFormated: format(new Date(), 'dd MMMM yyyy'),
                tarefa: input,
                userId: (session as any)?.id,
                nome: session?.user?.name 
            };
            setTaskList([...taskList, data]);
            setInput('');
        })
        .catch((error)=> {
            console.log("Error ao cadastrar: ", error);
        })
    }

    async function handleDelete(id: string) {
        await firebase.firestore().collection('tarefas').doc(id)
        .delete()
        .then(()=> {
            console.log("Deletado com sucesso.");
            let taskDeleted = taskList.filter((item:any) => {
                return (item.id !== id)
            });
            setTaskList(taskDeleted);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function handleEditTask(task: any) {
        setTaskEdit(task);
        setInput(task.tarefa);
    }

    function handleCancelEdit() {
        setInput("");
        setTaskEdit(null);
    }
    return (
        <>
        {session ? (
            <>
                <main className={styles.container}>
                    {taskEdit && (
                        <span className={styles.warnText}>
                            <button onClick={handleCancelEdit}>
                                <FiX size={30} color="FF3636"/>
                            </button>
                            Você está editando uma tarefa!
                        </span>
                    )}
                    <form onSubmit={handleAddTask}>
                        <input type="text" placeholder='Digite sua tarefa...' value={input} onChange={(e) => setInput(e.target.value)}/>
                        <button type='submit'>
                            <FiPlus size={25} color="#17181f"/>
                        </button>
                    </form>
                    <h1>Voce tem {taskList.length} {taskList.length === 1 ? 'Tarefa' : 'Tarefas'}</h1>
                    <section>
                        {taskList.map((task:any) => (
                            <article key={task.id} className={styles.taskList}>
                                {(session as any)?.vip ? (
                                    <Link href={`/board/${task.id}`}>
                                        <p>{task.tarefa}</p>
                                    </Link>
                                ) : (
                                    <Link href={`/board/`}>
                                        <p>{task.tarefa}</p>
                                    </Link>
                                )}
                                <div className={styles.actions}>
                                    <div>
                                        <div>
                                            <FiCalendar size={20} color="FFB800"/>
                                            <time>{task.createdFormated}</time>
                                        </div>
                                        {(session as any)?.vip && (
                                            <button onClick={() => handleEditTask(task)}>
                                                <FiEdit2 size={20} color="#FFF"/>
                                                <span>Editar</span>
                                            </button>
                                        )}
                                    </div>
                                    <button onClick={ () => handleDelete(task.id)}>
                                        <FiTrash size={20} color="#FF3636"/>
                                        <span>Excluir</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                </main>
                {(session as any)?.vip && (
                    <div className={styles.vipContainer}>
                        <h3>Obrigado por apoiar esse projeto.</h3>
                        <div>
                            <FiClock size={28} color="#FFF"/>
                            <time>
                                Última doação foi a {formatDistance(new Date((session as any)?.lastDonate),
                                 new Date(), {locale: ptBR})}.
                            </time>
                        </div>
                    </div>
                )}

                <SupportButton/>
            </>
        ):(
            redirect("/")
        )}
        </>
    )
}

export default Board;

