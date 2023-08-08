const multer = require('multer');
module.exports = exports = {
    viewContact: (req, res) => {
        // res.send("646");
        res.render('view_form')
    },
    saveContact : (req , res) =>{

        console.log(111111);
        console.log(req.body);

        // if(req.files){
        //     res.send("kbhfk");
        // }else{
        //     res.send("not found");
        // }

        // console.log(req.file1);
        // res.send("successfully")
    }
}