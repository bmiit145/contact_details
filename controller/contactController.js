
module.exports = exports = {
    viewContact: (req, res) => {
        // res.send("646");
        res.render('view_form')
    },
    saveContact : (req , res) =>{
        console.log(req.data);
        res.send("successfully")
    }
}