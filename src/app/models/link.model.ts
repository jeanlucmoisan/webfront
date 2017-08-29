export class Link {
    
    public _id: string;
    public _key: string;
    public _rev: string;
    public _from: string;
    public _to: string;

	constructor(id: string, key: string, rev: string, $from: string, $to: string) {
		this._id = id;
		this._key = key;
		this._rev = rev;
		this._from = $from;
		this._to = $to;
	}

}