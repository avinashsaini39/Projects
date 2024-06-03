// // import User from "../models/userSponser.js";
// import User from "../models/userSponser.js"
// export const create = async(req,res)=>{
//     try{
//         const userData = new User(req.body);
//         if(!userData){
//             return res.status(404).json({msg: "User data not found"})
//         }
//         const savedData = await userData.save();
//         res.status(200).json(savedData)
//     }
//     catch(error)
//     {
//         res.status(500).json({error: error})
//     }   
// }


// import User from "../models/userSponser.js";
// import User from "../models/userSponser.js"
// export const create = async(req,res)=>{
//     try{
//         const userData = new User(req.body);
//         if(!userData){
//             return res.status(404).json({msg: "User data not found"})
//         }
//         const savedData = await userData.save();
//         res.status(200).json(savedData)
//     }
//     catch(error)
//     {
//         res.status(500).json({error: error})
//     }   
// }

// import User from "../models/userSponser.js";
import User from "../models/userUser.js";
export const create = async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body
        const userData = new User(req.body);
        console.log("New User data:", userData); // Log the new User data
        if (!userData) {
            console.log("User data not found");
            return res.status(404).json({ msg: "User data not found" });
        }
        const savedData = await userData.save();
        console.log("Saved User data:", savedData); // Log the saved User data
        res.status(200).json(savedData);
    } catch (error) {
        console.error("Error:", error); // Log any errors that occur
        res.status(500).json({ error: error });
    }
};
export const getAll = async (req, res) => {
    try {
        // Retrieve all Users from the database
        const allUsers = await User.find().sort({timeTemps: -1});

        // Check if any Users were found
        if (allUsers.length === 0) {
            return res.status(404).json({ msg: "No Users found" });
        }

        // Respond with the retrieved Users
        res.status(200).json(allUsers);
    } catch (error) {
        // Handle any errors that occur
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getOne = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(200).json(userExist);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(401).json({ msg: "User not found" });
      }
      const deleteUser = await User.findByIdAndDelete(id);
      res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  export const update = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(401).json({ msg: "User not found" });
      }
      const updateData = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ msg: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };