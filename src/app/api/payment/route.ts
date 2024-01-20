import { NextRequest, NextResponse } from "next/server";
import { exit } from "process";


export async function POST(req: NextRequest) {
    try {
        const dados = await req.json();
        const chave = dados.produtos.chave;
        console.log(dados);

        /*if(chave !== "3f842492bf58a2c5b5150eed082a04e4"){
            exit();
        }*/

        const statusVenda = dados.venda.status;
        console.log(statusVenda);
        if (statusVenda === 'Finalizada') {
            console.log('A compra foi finalizada.');
        } else {
            console.log('A compra não foi finalizada. Ignorando.');
        }
        return NextResponse.json({ message:"informação recebida com sucesso.", dados: dados}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message:"Algo deu errado."}, {status: 500});
    }
}