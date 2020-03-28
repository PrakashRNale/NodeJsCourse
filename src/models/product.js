const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('Product', productSchema);



// Below code is used without mongoose


// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// module.exports = class Product{
//     constructor(title , price , id , userId){
//         this.productName = title;
//         this.productPrice = price;
//         this._id = id;
//         this.userId = userId;
//     }

//     save(){
//         const db = getDb();
//         if(this._id){
//             //update product
//             return db.collection('products').updateOne({_id : this._id }, {$set : this}).then(result =>{
//                 console.log('result');
//             }).catch(err =>{
//                 console.log(err);
//             })
//         }else{
//             //create new product
//             return db.collection('products').insertOne(this).then(result =>{
//                 console.log(result);
//             }).catch(err => {
//                 console.log(err);
//             });
//             // product.push(this);
//         }
//         // mongodb will create products collection if it is not already created by below code
        
//     }

//     static fetchAll(){
//         const db = getDb();
//         return db.collection('products').find().toArray().then(result =>{
//             return result;
//         }).catch(err =>{
//             console.log(err);
//         });
//     }

//     static getProduct(productId){
//         const db = getDb();
//         console.log('id passd by ui is '+productId);
//         return db.collection('products').find({_id : new mongodb.ObjectID(productId)}).toArray().then(result =>{
//             return result;
//         }).catch(err =>{
//             console.log(err);
//         })
//     }

//     static deleteDocument(productId){
//         const db = getDb();
//         return db.collection('collection').deleteOne({_id : new mongodb.ObjectID(productId)}).then(result =>{
//             console.log(result);
//         }).catch(err=>{
//             console.log(err);
//         })
//     }

// }