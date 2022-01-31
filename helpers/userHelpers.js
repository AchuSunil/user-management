var db = require("../config/connection");
var collection = require("../config/collection");

module.exports = {
    doSignup: (userDetails) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.user)
                .insertOne(userDetails)
                .then(() => {
                    resolve({ status: true });
                    console.log("Inserted Successfully");
                });
        });
    },

    doLogin: (loginDetails) => {
        var email = loginDetails.email;
        var password = loginDetails.password;
        let response = {};

        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.user).findOne({ email: email, password: password });

            if (user) {
                
                console.log("login success");
                response.user = user;
                response.status = true;
                resolve(response);
            } else {
                console.log("login failed");
                resolve({ status: false });
            }
        });
    },
};
