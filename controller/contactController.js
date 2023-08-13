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
        var  data = []
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

            $.ajax({
                type: "post",
                url: "https://validate-conatct-json.vercel.app/validate",
                data: {
                    data:data
                },
                dataType: "application/json",
                success: function (response) {
                    console.log(response);
                    res.send(response)
                }
            });

            // validate data 
        // const {error}  = dataSchema.validate(data ,  { abortEarly: false });

        // if (error) {
        //     res.status(400).json({ error: error});
        // } else {
        //     res.json({ message: 'JSON data is valid!' });
        // }

        // if(req.files){
        //     res.send("kbhfk");
        // }else{
        //     res.send("not found");
        // }

        // console.log(req.file1);
        // res.send("successfully")
    }
}