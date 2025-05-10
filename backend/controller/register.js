const Register = require('../moduls/register')
const { parseISO, isValid } = require('date-fns'); // Install date-fns


const registerGet = async (req,res) => {
    const register = await Register.find()
    return res.json(register)
}

const registerGetid =async (req,res) => {
    const resgister = await Register.findById(req.params.id)
    return res.json(resgister)
}


const registerInsert =  async(req,res) => {
    console.log(req.body);
    
const{name,email,eventtype,participants,eventdate, description}=req.body
if(!name || !email || !eventtype){
    res.json({message:"required field is empty"})
}
const newRegister = await Register.create({
    name,email,eventtype,participants,eventdate,description
})
return res.json(newRegister)
}


const registerEdit = async(req,res) => {
    const{name,email,eventtype,participants,eventdate, description}=req.body
    const resgister = await Register.findById(req.params.id)
    try{
        if(resgister){
            const update =  await Register.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.json({name,email,eventtype,participants,eventdate,description})
        }
    }catch{
        return res.status(404).json({message:"Event Updated Error"})
    }
}


const registerDel = async (req,res) => {
    try{
        await Register.deleteOne({_id:req.params.id})
        res.json({status:'ok'})
    }catch(error){
      return res.status(404).json({message:"Event delete error"})
    }
}


module.exports = {registerGet,registerGetid,registerInsert,registerEdit,registerDel}