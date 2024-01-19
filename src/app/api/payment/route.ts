import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const dados = await req.json();

        var filter = dados.venda.filter(function(e:any) {
            var status = e.status
            return status;
        });
        console.log(filter);

        return NextResponse.json({ message:"informação recebida com sucesso."}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message:"Algo deu errado."}, {status: 500});
    }
}