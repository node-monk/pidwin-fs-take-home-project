import User from "../models/user.js";

const refreshRewards = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user.rewards);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(error);
  }
};

export default refreshRewards;
