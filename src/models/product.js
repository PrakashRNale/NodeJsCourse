const product = [];
module.exports = class Product{
    constructor(title){
        this.productName = title
    }

    save(){
        product.push(this);
    }

    static fetchAll(){
        return product;
    }
}