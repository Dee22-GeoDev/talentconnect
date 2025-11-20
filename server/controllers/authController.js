const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* ------------------------------ HELPERS ------------------------------ */
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      phone: user.phone,
    },
    process.env.JWT_SECRET || 'changeme',
    { expiresIn: '7d' }
  );
};

const sanitizeUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    phone: user.phone,
  };
};

/* ------------------------------ REGISTER ------------------------------ */
exports.register = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      passwordHash: hash,
      fullName,
      role: role || "user"  // default if missing
    });

    await user.save();

    const token = generateToken(user);

    return res.json({
      token,
      user: sanitizeUser(user),
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------ LOGIN ------------------------------ */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash || "");
    if (!valid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    return res.json({
      token,
      user: sanitizeUser(user),
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------ ME ------------------------------ */
exports.me = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });

    return res.json({
      user: sanitizeUser(req.user),
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
