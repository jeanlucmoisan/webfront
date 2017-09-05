export class Location {
    
    public _id: string;
    public _key: string;
    public _rev: string;
    public tenant: string;
	public name: string;
	public lat: string;
	public lon: string;

	constructor(id: string, key: string, rev: string, $tenant: string, $name: string, $lat: string, $lon: string) {
		this._id = id;
		this._key = key;
		this._rev = rev;
		this.tenant = $tenant;
		this.name = $name;
		this.lat = $lat;
		this.lon = $lon;
	}

}