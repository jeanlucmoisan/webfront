import { Employee } from './employee.model';

export class Department {
    
    public _id: string;
    public _key: string;
    public _rev: string;
    public tenant: string;
    public name: string;
    public collaborators:Employee[];
    public manager: Employee;
    public addressID: string;

	constructor(id: string, key: string, rev: string, $tenant: string, $name: string, $collaborators: Employee[], $manager: Employee, $addressID: string) {
		this._id = id;
		this._key = key;
		this._rev = rev;
		this.tenant = $tenant;
		this.name = $name;
		this.collaborators = $collaborators;
		this.manager = $manager;
		this.addressID = $addressID;
	}

}