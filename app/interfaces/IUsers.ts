export interface IUsers{
    UserID:string;
    EmailID:string;
    Password:string;
    UserType:string;
    MobileNumber?:string;
    CreatedAt?:string;
}

export interface SiginDetails{ 
    EmailID:string;
    Password:string; 
    CreatedAt?:string;
}