import { NextRequest, NextResponse } from "next/server";
import { exit } from "process";


export async function POST(req: NextRequest) {
    try {
        const dados = await req.json();
        const chave = dados.produtos.chave;

        if(chave !== "3f842492bf58a2c5b5150eed082a04e4"){
            exit();
        }

        const statusVenda = dados.venda.status;
        if (statusVenda === 'Finalizada') {
            console.log('A compra foi finalizada.');
            let email = dados.produtos.comprador.email;
            let cnpj_cpf = dados.produtos.comprador.cnpj_cpf;
            console.log(email);
            console.log(cnpj_cpf);
        } else {
            console.log('A compra não foi finalizada. Ignorando.');
        }

        return NextResponse.json({ message:"informação recebida com sucesso."}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message:"Algo deu errado."}, {status: 500});
    }
}