const product = [];
const getDb = require('../util/database').getDb;
module.exports = class Product{
    constructor(title){
        this.productName = title
    }

    save(){
        const db = getDb();
        // mongodb will create products collection if it is not already created by below code
        return db.collection('products').insertOne(this).then(result =>{
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
        // product.push(this);
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray().then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        });
    }
}