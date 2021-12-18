export class RequestDto {
    account: {
        email: string,
        fullName: string,
        id: number,
        passWord: string,
        requestTypeStatus: boolean,
        role: string
    }
    bookedByClub: boolean
    dateCreated: string
    dateModified: string
    deleteStatus: boolean
    id: number
    note: string
    status: string
    typeRequest: "string"
    request:any




}