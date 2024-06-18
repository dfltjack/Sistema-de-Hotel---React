import Api from "../helpers/api"

export async function GetHospedes (){
    return await Api.get('/hospede');
}

export async function GetHospedeById(id){
    return await Api.get(`hospede/GetHospedesById/${id}`);
}

export async function PostHospede(hospede){
    return await Api.post('/hospede/posthospedes', hospede);
}

export async function PutHospede(hospede){
    return await Api.put('/hospede/puthospedes', hospede);
}

export async function DeleteHospede(id){
    return await Api.delete(`/hospede/deletehospede/${id}`);
}