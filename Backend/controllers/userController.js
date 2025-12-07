import User from "../models/userModal.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")

        if(!user){
            res.status(400).json({message:"User Not Found"})
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message: `Get current user error ${error}`})
    }
}
