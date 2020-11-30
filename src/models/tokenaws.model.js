const {awsConfig} =require('../config/awsConfig.js');
const saveToken = (refreshToken, user_email, refreshTokenExpires, tokenType) =>{
    var AWS = require("aws-sdk");
    AWS.config.update(awsConfig);

    let docClient = new AWS.DynamoDB.DocumentClient();

    let save = function () {

        var input = {
            "token": user_email, "tokenValue":refreshToken , "type": tokenType,
            "expired": refreshTokenExpires.toDate()
        };
        var params = {
            TableName: "Token",
            Item:  input
        };
        console.log('saveToken--input ',input);
        docClient.put(params, function (err, data) {

            if (err) {
                console.log("token::save::error - " + JSON.stringify(err, null, 2));                      
            } else {
                console.log("token::save::success" );                      
            }
        });
        return input;
    }

    return save();
    
}
module.exports = {
    saveToken,
};