import User from "../models/userModel";


 export const create = async(req, res)=>{
    try {

        const userData = new User.default(req.body);

        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }

        const savedDatga = await userData.save();
        res.status(200).json(savedDatga);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

