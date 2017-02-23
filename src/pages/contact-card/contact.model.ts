export class ContactModel {
	images: Array<string> = [];
	name: string;
	rating: number;
	email: string;
  phone: string;
  website: string;
  address: string;

	constructor() {
    this.images = [
			'./assets/images/maps/place-1.jpg',
			'./assets/images/maps/place-2.jpg',
			'./assets/images/maps/place-3.jpg',
			'./assets/images/maps/place-4.jpg'
		];
		this.name = "Railway Cafe";
		this.rating = 4;
		this.email = "contact@ionicthemes.com";
	  this.phone = "555-555-555";
	  this.website = "https://ionicthemes.com";
	  this.address = "7644 sable st";
  }
}
