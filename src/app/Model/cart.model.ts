

export class Cart{
    cart_id:number | undefined;
    userId!:number | undefined;   // user id //fk
    catId!:any;

    id!:any; // product id
    name!:string;  // product name
    catName!:string;
    productImage_1!: string;
    regularPrice!:number;
    offerPrice!:any;
    description!:string;  // product description
    quantity: any;

}