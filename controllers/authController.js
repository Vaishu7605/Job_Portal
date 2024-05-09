// import userModel from "../models/userModel.js";

// export const registerController = async (req, res, next) => {
//     const { name, email, password, lastName } = req.body; // Changed Password to password for consistency
//     try {
//         if (!name || !email || !password || !lastName) {
//             return res.status(400).json({ success: false, message: "Please provide all required fields." });
//         }

//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "Email already registered. Please login." });
//         }

//         const user = await userModel.create({ name, email, password, lastName });

//         // Token 
//         const token = user.createJWT();
//         res.status(200).json({
//             success: true,
//             message: "User created successfully.",
//             user: {
//                 name: user.name,
//                 lastName: user.lastName,
//                 email: user.email,
//                 location: user.location // Assuming you have a location field
//             },
//             token
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ success: false, message: "Internal server error." });
//     }
// };
// // import userModel from "../models/userModel.js";

// // export const registerController = async (req, res, next) => {
// //     const { name, email, Password, lastName } = req.body
// //     if (!name) {
// //         next("Name is Required");
// //     }
// //     if (!email) {
// //         next("Email is Required");
// //     }

// //     if (!Password) {
// //         next("Password is Required and Greater than 6 character");
// //     }
// //     const existingUser = await userModel.findOne({ email });
// //     if (existingUser) {
// //         next("Email already register please login");
// //     }
// //     const user = await userModel.create({ name, email, Password, lastName });


// //     // Token 
// //     const token = user.createJWT();
// //     res.status(200).send({
// //         success: true,
// //         message: "User Created Successfully !!!!!",
// //         user: {
// //             name: user.name,
// //             lastname: user.lastName,
// //             email: user.email,
// //             location: user.location
// //         },
// //         token
// //     });
// // };

// export const loginController = async (req, res, next) => {
//     const { email, Password } = req.body

//     if (!email || !Password) {
//         next('Please provide all fields!!!')
//     }
//     const user = await userModel.findOne({ email }).select("+Password")
//     if (!user) {
//         next('Invalid Username or Password')
//     }
//     // compare Password 
//     const isMatch = await user.comparePassword(Password)
//     if (!isMatch) {
//         next('Invalid Username or Password')
//     }
//     user.Password = undefined;
//     const token = user.createJWT();

//     res.status(200).json({
//         success: true,
//         message: "Login Successfully",
//         user,
//         token,
//     });
// };


import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    const { name, email, password, lastName } = req.body;
    //validate
    if (!name) {
        next("name is required");
    }
    if (!email) {
        next("email is required");
    }
    if (!password) {
        next("password is required and greater than 6 character");
    }
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
        next("Email Already Register Please Login");
    }
    const user = await userModel.create({ name, email, password, lastName });
    //token
    const token = user.createJWT();
    res.status(201).send({
        success: true,
        message: "User Created Successfully",
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        },
        token,
    });
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
        next("Please Provide All Fields");
    }
    //find user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        next("Invalid Useraname or password");
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        next("Invalid Useraname or password");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: "Login SUccessfully",
        user,
        token,
    });
};