export class RequestDto{
    id: number
    dateCreated: string
    dateModified: string
    typeRequest: string
    note: string
    status: string
    deleteStatus: boolean
    account: {
      id: number
      email: string
      fullName: string
      role: string
      clubMembers: any[]
      eventMembers: any[]
      passWord: string
    }
    request: any
    requestDetailStatus:string;
}
export class RequestByBuidingDto {
  deleteStatus: boolean
  facility: {
    available: boolean
    building: boolean
    deleteStatus: boolean
    facilityName: string
    id: number
  }
  id: number
  timeUsing: string
  useDate: string
}