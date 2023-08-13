const fs = require('fs');
const csvParser = require('csv-parser');
const { exit } = require('process');

module.exports = exports = {
    viewContact: (req, res) => {
        // res.send("646");
        res.render('view_form')
    },
    saveContact: (req, res) => {
        // read a data of parser
        var data = []
        const csvFilePath = req.file.path;

        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('headers', (headers) => {
                if (headers.includes('phone') || headers.includes('Phone')) {
                    console.log('CSV file contains the <phone> field.');

                    fs.createReadStream(csvFilePath)
                        .pipe(csvParser())
                        .on('data', (row) => {
                            data.push(row);
                        })
                        .on('end', () => {
                            console.log('CSV file read and processed.');
                            console.log(data);

                            phonedata = data.map(item => ({
                                "phone": getNormalizedPhone(item)
                            }));

                            console.log(JSON.stringify(phonedata, null, 2));

                        });
                } else {
                    console.log('CSV file not contains the "phone" field.');
                    res.status(400).send('CSV file not  contains the "phone" field.');
                }
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                res.status(500).send('Error reading CSV file.');
            });

        // const data1 = [
        //     { Name: 'K595', Phone: '+265 883 65 68 59' },
        //     { Name: 'K596', Phone: '+265 994 26 00 10' },
        //     { Name: 'K597', Phone: '+91 6353 009 487' },
        //     { Name: 'K598', Phone: '+91 6353 605 596' },
        //     { Name: 'K599', Phone: '+91 6354 880 802' },
        //     { Name: 'K600', Phone: '+91 6355 050 757' },
        //     { Name: 'K601', Phone: '+91 70046 81515' }
        //   ];



        // validating data by python ajax

        // const axios = require('axios');

        // const apiUrl = 'https://validate-conatct-json.vercel.app/validate';

        // // Data to send in the request
        // const postData = {
        //     data: data
        // };

        // // Make a POST request with the data
        // axios.post(apiUrl, postData)
        //     .then(response => {
        //         console.log('Response:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
    }
}


// Function to normalize phone attribute's case
function getNormalizedPhone(item) {
    const phoneAttributes = ["phone", "Phone", "PHonE", "PHONE"]; // Add more variations as needed

    for (const attr of phoneAttributes) {
        if (item.hasOwnProperty(attr)) {
            return item[attr].toLowerCase();
        }
    }

    return null; // Handle the case where phone attribute is not found
}