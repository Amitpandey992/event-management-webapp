import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            return res
                .status(500)
                .json({ message: "Admin credentials are not set" });
        }

        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
