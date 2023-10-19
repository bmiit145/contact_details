const fs = require('fs');
const csvParser = require('csv-parser');
const {exit} = require('process');
const axios = require("axios");

module.exports = exports = {
    viewContact: (req, res) => {
        // res.send("646");
        res.render('view_form')
    },

    saveContact: (req, res) => {
        parseCSVFile(req.file.path)
            .then((phonedata) => {
                return sendToPythonAPI(phonedata);
            })
            .then((response) => {
                console.log('Response:', response.data);
                res.status(200).json({message: 'Data processed successfully'});
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).json({error: 'Internal Server Error'});
            });
    },


    // saveContact: (req, res) => {
    //     // read a data of parser
    //     var data = []
    //     const csvFilePath = req.file.path;
    //
    //     fs.createReadStream(csvFilePath)
    //         .pipe(csvParser())
    //         .on('headers', (headers) => {
    //             if (headers.includes('phone') || headers.includes('Phone')) {
    //                 console.log('CSV file contains the <phone> field.');
    //
    //                 fs.createReadStream(csvFilePath)
    //                     .pipe(csvParser())
    //                     .on('data', (row) => {
    //                         data.push(row);
    //                     })
    //                     .on('end', () => {
    //                         console.log('CSV file read and processed.');
    //                         // console.log(data);
    //
    //                         phonedata = data.map(item => ({
    //                             "phone": getNormalizedPhone(item)
    //                         }));
    //
    //                         // console.log(JSON.stringify(phonedata, null, 2));
    //                         data = JSON.stringify(phonedata, null, 2);
    //                         // console.log(data)
    //
    //
    //                         // validating data by python ajax
    //
    //                         const axios = require('axios');
    //
    //                         const apiUrl = 'https://validate-conatct-json.vercel.app/validate';
    //
    //                         // Data to send in the request
    //                         const postData = {
    //                             data: data
    //                         };
    //
    //                         // Make a POST request with the data
    //                         axios.post(apiUrl, postData)
    //                             .then(response => {
    //                                 console.log('Response:', response.data);
    //                             })
    //                             .catch(error => {
    //                                 console.error('Error:', error);
    //                             });
    //
    //                     });
    //             } else {
    //                 console.log('CSV file not contains the "phone" field.');
    //                 res.status(400).send('CSV file not  contains the "phone" field.');
    //             }
    //         })
    //         .on('error', (error) => {
    //             console.error('Error reading CSV file:', error);
    //             res.status(500).send('Error reading CSV file.');
    //         });
    // }
}

function parseCSVFile(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        // allowed only PHONE field
        const phoneHeaderRegex = /^\s*phone\b\s*$/i;

        // allowed phone with veriations with number
        // const phoneHeaderRegex = /\bphone\b(?:s?\d?)?\b/i;

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('headers', (headers) => {
                const phoneHeaderRegex = /^\s*phone\b\s*$/i;

                if (headers.some(header => phoneHeaderRegex.test(header)) || headers.includes('Phone 1 - Value')) {
                    console.log('CSV file contains the "phone" field.');
                } else {
                    console.log('CSV file does not contain the "phone" field.');
                    reject('CSV file does not contain the "phone" field.');
                }
            })
            .on('data', (row) => {
                Phonevalue = getNormalizedPhone(row);
                data.push(Phonevalue);
            })
            .on('end', () => {
                console.log('CSV file read and processed.');
                // const phonedata = data.map(item => ({
                //     phone: getNormalizedPhone(item),
                // }));

                phonedata = data;
                // console.log(data)
                resolve(phonedata);
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                reject('Error reading CSV file.');
            });
    });
}

// Function to normalize phone attribute's case
function getNormalizedPhone(item) {


    const PhoneRegex = /^\s*phone\b\s*$/i;
    for (const key in item) {
        if (PhoneRegex.test(key)) {
            return item[key];
        } else if (key == 'Phone 1 - Value') {
            return item[key];
        }
    }
    return null; // Handle the case where phone attribute is not found
}

function sendToPythonAPI(phonedata) {
    const apiUrl = 'https://validate-conatct-json.vercel.app/validate';

    // Create an array of objects with the "phone" attribute in the format you want
    const formattedData = phonedata.map(item => ({
        // phone: item.phone,
        phone: item,
    }));

    const postData = formattedData;

    console.log('Sending data to Python API:', postData)

    return axios.post(apiUrl, postData);
}
