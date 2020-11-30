
const {awsConfig} =require('../config/awsConfig.js');

const getDocClient = () =>{
    var AWS = require("aws-sdk");
    AWS.config.update(awsConfig);
    return new AWS.DynamoDB.DocumentClient();;
}
const createAccount = (user) =>{
    var input = {
        "email": user.email, "created_by": user.username, "created_on": new Date().toString(),
        "updated_by": user.username, "updated_on": new Date().toString(), "is_deleted": false,
        "password":user.password,"first_name":user.first_name,"last_name":user.last_name
    };
    var params = {
        TableName: "Account",
        Item:  input
    };
    getDocClient().put(params, respHandler);
    return input;
}

async function _fetchUser(email) {
    return new Promise(function(resolve, reject) {
        var params = {
            TableName: "Account",
            Key: {
                "email": email
            }
        };
        let awsInstance = getDocClient();
        awsInstance.get(params,(err, data) => {
            if (err) {
                console.log("users::save::error - " );                      
                reject(err, null, 2)
            } else {
                console.log("users::save::success");
                resolve(data);
            }
        });
    });
}
const getUser = async(email) =>{
    let user=await _fetchUser(email);
    console.log('returning user',user);
    return user;
}
module.exports = {
    createAccount,
    getUser,
};