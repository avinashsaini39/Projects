import User from "../model/userModel.js";


//create api
export const create = async(req, res)=>{
    try {
        const userData = new User(req.body);

        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }

        const savedData = await userData.save();
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}


//fetch api(get api) / filter by status(active/inactive)
export const getAll = async(req, res) =>{
    try 
    {
        const status = req.query.status;
        const gender = req.query.gender;
        let query = {};
        if(status){
            query.status = status;
        }
        if(gender){
            query.gender = gender;
        }
        

        const userData = await User.find(query);
        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({error: error});
    }
};




export const getOne = async(req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist);


    } catch (error) {
        res.status(500).json({error: error});
    }
}

//update api

export const update = async(req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg: "User not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "User updated successfully"});
    } catch (error) {
        res.status(500).json({error: error});
    }
}


//delete api

export const deleteUser = async(req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error});
    }
}



//search api

export const searchUsers = async (req, res) => {
    try {
        const term = req.query.term;
        const users = await User.find({
            $or: [
                { fname: { $regex: term, $options: 'i' } }, // Case-insensitive search by first name
                { lname: { $regex: term, $options: 'i' } }, // Case-insensitive search by last name
                { email: { $regex: term, $options: 'i' } } // Case-insensitive search by email
            ]
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



