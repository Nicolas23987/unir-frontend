

export function SuccesDataResponse (Data: any, Message:string = "La operación fue realizada con exito", Status:number = 200){

    return {Data, Message, Status}
}