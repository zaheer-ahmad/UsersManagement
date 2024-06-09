export default class UserModel{
    name:string;
    username:string;
    email:string;
    role:string;
    actionUser:string;

    constructor(name:string,username: string,email:string,role:string,actionUser:string) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.role = role;
        this.actionUser = actionUser;
    }
}