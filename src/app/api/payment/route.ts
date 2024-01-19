import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const dados = await req.json();

        const statusVenda = dados.venda.status;
        if (statusVenda === 'Finalizada') {
            console.log('A compra foi finalizada. Executar lógica adicional se necessário.');
        } else {
            console.log('A compra não foi finalizada. Ignorando.');
        }

        return NextResponse.json({ message:"informação recebida com sucesso."}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message:"Algo deu errado."}, {status: 500});
    }
}