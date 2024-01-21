import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const dados = await req.json();
        console.log(dados);
        const name = dados["customer"]["full_name"];
        const cnpj_cpf = dados["customer"]["identification_number"];
        const email = dados["customer"]["email"];

        /*if(chave !== "00ede988d3b5fd2b6cd6fcba2a300ad8"){
            return;
        }*/

        const statusVenda = dados["sale_status_detail"];
        console.log(statusVenda);
        if (statusVenda === 'pending') {
            console.log('A compra foi finalizada.');
            console.log(cnpj_cpf);
            console.log(email);
        } else {
            console.log('A compra não foi finalizada. Ignorando.');
        }
        return NextResponse.json({ message:"informação recebida com sucesso.", dados: dados}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message:"Algo deu errado."}, {status: 500});
    }
}