import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const dados = await req.json();
        //console.log(dados);
        const chaveUnica = dados["chave_unica"];
        const chave = dados['produto']['chave'];
        const cnpj_cpf = dados["comprador"]["cnpj_cpf"];
        const email = dados["comprador"]["email"]

        /*if(chaveUnica !== "3f842492bf58a2c5b5150eed082a04e4"){
            return;
        }*/

        /*if(chave !== "4a920341e79639658c2459847e146da9"){
            return;
        }*/

        const statusVenda = dados["venda"]["status"];
        console.log(statusVenda);
        if (statusVenda === 'Finalizada') {
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