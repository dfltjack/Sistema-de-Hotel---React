import Api from "../helpers/api";

export async function GetReservas(){
    return await Api.get('/reserva');
}

export async function GetReservaById(id){
    return await Api.get(`reserva/GetReservaById/${id}`);
}

export async function PostReserva(reserva){
    return await Api.post('/reserva/postreserva', reserva);
}

export async function PutReserva(reserva){
    return await Api.put('/reserva/putreserva', reserva);
}

export async function DeleteReserva(id){
    return await Api.delete(`/reserva/deletereserva/${id}`);
}