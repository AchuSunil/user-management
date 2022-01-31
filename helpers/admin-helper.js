var db = require("../config/connection");
var collection = require("../config/collection");
var Objectid= require('mongodb').ObjectId;
const { reject } = require("bcrypt/promises");

module.exports = {
    
    getUsers:()=>{
    
        return new Promise(async (resolve,reject)=>{
           let  userData = await db.get().collection(collection.user).find().toArray()
            resolve(userData)

        })
    },

    doLogin: (loginDetails) => {
        var email = loginDetails.email;
        var password = loginDetails.password;
        let response = {};

        return new Promise(async (resolve, reject) => {
            let admin = await db.get().collection(collection.admin).findOne({ email: email, password: password });

            if (admin) {
                
                console.log("admin login success");
                response.admin = admin;
                response.status = true;
                resolve(response);
            } else {
                console.log("login failed");
                resolve({ status: false });
            }
        });
    },

    getUserDetail:(user_id)=>{
        return new Promise( (resolve, reject)=>{
              db.get().collection(collection.user).findOne({_id:Objectid(user_id)}).then((userData)=>{
                resolve(userData)

            })
        })
    },
    updateUserDetail:(user_id,data)=>{
        return new Promise ((resolve, reject)=>{
            db.get().collection(collection.user).updateOne({_id:Objectid(user_id)},
            {
                $set:{username:data.username,
                    email:data.email,
                    password:data.password
                }
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    },

    deleteUser:(user)=>{
       return new Promise((resolve,reject)=>{
           db.get().collection(collection.user).deleteOne({_id:Objectid(user)}).then((response)=>{
               resolve(response);
           })
       })
    }
};
