const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

module.exports = class User{
    constructor(name , email , cart , id){
        this.name = name;
        this.email = email;
        this.cart = cart || [];
        this._id = id;
    }

    save(){
        const db = getDb();
        console.log(this);
        return db.collection('Users').insertOne(this).then(result =>{
            console.log('user added successfully');
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static findById(id){
        
        const db = getDb();
        return db.collection('Users').findOne({_id : mongodb.ObjectID(id)}).then(user =>{
            
            return user;
        }).catch(err => {
            console.log(err);
        })
    }

    addToCart(productId){
        console.log('product id is added '+productId);
        //let productIndex = this.cart.items.findByIndex
        let updatedCartItems ;
        if(this.cart.items){
            updatedCartItems = [...this.cart.items];
        }else{
            updatedCartItems = [];
        }

        let cartIndex = updatedCartItems.findIndex(cp => {
            return cp._id.toString() === productId.toString()
        })
        let quantity = 1;

        if(cartIndex > -1){
            updatedCartItems[cartIndex].quantity += 1;
        }else{
            let item = {
                _id : productId,
                quantity : quantity
            }
            updatedCartItems.push(item);
        }

        let updatedCart = {
            items : updatedCartItems
        }

        const db = getDb();
        return db.collection('Users').updateOne({_id : mongodb.ObjectID(this._id)}, {$set :{cart : updatedCart }}).then(result => {
            
        }).catch(err =>{
            console.log(err);
        })
    }

    getCartItems(){
        let productIds = this.cart.items.map(cp =>{
            return mongodb.ObjectID(cp._id);
        })
        const db = getDb();
        return db.collection('products').find({_id : {$in : productIds}}).toArray().then(result => {
            return result.map(cp =>{
                return {
                    ...cp,
                    quantity : this.cart.items.find(i =>{
                        return i._id.toString() === cp._id.toString()
                    }).quantity
                }
            })
        }).catch(err =>{
            console.log(err);
        })
    }

    removeFromCart(productId){
        debugger;
        let updatedCartItems = this.cart.items.filter(cp => {
            return cp._id.toString() != productId.toString();
        })
        debugger;
        const db = getDb();
        return db.collection('Users').updateOne({_id : mongodb.ObjectID(this._id)} , {$set : {cart:{items : updatedCartItems}}})
    }
}