import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const { name, email, lastName, location } = req.body;
    if (!name || !email || !lastName || !location) {
        next('Please provide all fields');
    }
    const user = await userModel.findOne({ _id: req.user.userId });
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.location = location;

    await user.save();
    const token = user.createJWT();
    res.status(200).json({
        user,
        token,
    });


};

// export const updateUserController = async (req, res, next) => {
//     const { name, email, lastName, location } = req.body;
//     if (!name || !email || !lastName || !location) {
//         return next('Please provide all fields');
//     }
//     try {
//         const user = await userModel.findOne({ _id: req.user.userId });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         user.name = name;
//         user.lastName = lastName;
//         user.email = email;
//         user.location = location;
//         await user.save();
//         const token = user.createJWT();
//         res.status(200).json({
//             user,
//             token,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
