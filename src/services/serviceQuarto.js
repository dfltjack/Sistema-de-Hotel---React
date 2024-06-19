import Api from "../helpers/api";

export async function GetQuartos(){
    return await Api.get('/quarto');
}

export async function GetQuartoById(id){
    return await Api.get(`quarto/GetQuartoById/${id}`);
}

export async function PostQuarto(quarto){
    return await Api.post('/quarto/postquarto', quarto);
}

export async function PutQuarto(quarto){
    return await Api.put('/quarto/putquarto', quarto);
}

export async function DeleteQuarto(id){
    return await Api.delete(`/quarto/deletequarto/${id}`);
}