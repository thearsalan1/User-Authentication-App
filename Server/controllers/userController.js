import userModel from "../models/UserModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);

    const user = await userModel.findById(userId);
    if (!user) {
      res.status(400).json({ success: false, message: "Cannot find the user" });
    }
    return res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
