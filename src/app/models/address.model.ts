export class Address {
    public _id: string;
    public _key: string;
    public tenant: string;
    public street1: string;
    public street2: string;
    public postalcode: string;
    public locality: string;
    public region: string;
    public country: string;

	constructor(id: string, key: string, $tenant: string, $street1: string, $street2: string, $postalcode: string, $locality: string, $region: string, $country: string) {
		this._id = id;
		this._key = key;
		this.tenant = $tenant;
		this.street1 = $street1;
		this.street2 = $street2;
		this.postalcode = $postalcode;
		this.locality = $locality;
		this.region = $region;
		this.country = $country;
	}
    
}