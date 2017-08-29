export class Employee {
    public _id: string;
    public _key: string;
    public firstname: string;
    public lastname: string;


	constructor(id: string, key: string, $firstname: string, $lastname: string) {
		this._id = id;
		this._key = key;
		this.firstname = $firstname;
		this.lastname = $lastname;
	}
    
}