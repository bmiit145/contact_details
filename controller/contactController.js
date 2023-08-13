const fs = require('fs');
const csvParser = require('csv-parser');

module.exports = exports = {
    viewContact: (req, res) => {
        // res.send("646");
        res.render('view_form')
    },
    saveContact: async (req, res) => {

        // Define a schema for the JSON data
        const Joi = require('joi');
        const dataSchema = Joi.object({
            name: Joi.string().required().error(new Error('Name is missing')),
            age: Joi.number().integer().min(0).required().error(new Error('abc is missing')),
            // email: Joi.string().email().required()
        });


        // read a data of parser
        var data = []
        const csvFilePath = req.file.path;

        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                data.push(row);
            })
            .on('end', () => {
                console.log('CSV file read and processed.');
                console.log(data);
            });



        // validating data by python ajax

        const axios = require('axios');

        const apiUrl = 'https://validate-conatct-json.vercel.app/validate';

        // Data to send in the request
        const postData = {
            data: data
        };

        // Make a POST request with the data
        axios.post(apiUrl, postData)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}