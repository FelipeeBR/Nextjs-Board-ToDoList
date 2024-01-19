import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const dados = await req.json();
        //await req.json().then((data) => data as {data: {id: string}});
        console.log('Postback recebido:', dados);

        const chave_unica = dados?.getReader
        return NextResponse.json({ message:"informação recebida com sucesso.", dados: dados}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message:"Algo deu errado."}, {status: 500});
    }
}