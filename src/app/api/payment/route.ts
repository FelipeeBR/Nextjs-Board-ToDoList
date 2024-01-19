import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const dados = req.body;
        console.log('Postback recebido:', dados);
        return NextResponse.json({ message:"informação recebida com sucesso."}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message:"Algo deu errado."}, {status: 500});
    }
}