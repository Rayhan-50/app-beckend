// import express from 'express';
// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // Generate JWT token
// const generateAuthToken = (userId) => {
//     return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
// };

// router.post('/register', async (req, res) => {
//     try {
//         const { email, username, password } = req.body;

//         if (!email || !username || !password) {
//             return res.status(400).json({ message: 'Please fill all fields' });
//         }
//         if (password.length < 6) {
//             return res.status(400).json({ message: 'Password must be at least 6 characters' });
//         }
//         if (username.length < 3) {
//             return res.status(400).json({ message: 'Username must be at least 3 characters' });
//         }

//         const existingEmail = await User.findOne({ email });
//         if (existingEmail) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         const existingUsername = await User.findOne({ username });
//         if (existingUsername) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         const profileImage = `https://api.dicebear.com/5.x/initials/svg?seed=${username}`;
//         const user = new User({
//             email,
//             username,
//             password,
//             profileImage,
//         });

//         await user.save();

//         // Generate and return token
//         const token = generateAuthToken(user._id);

//         res.status(201).json({
//             token,
//             user: {
//                 _id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 profileImage: user.profileImage,
//             },
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// router.post('/login', async (req, res) => {
//    try{
//         const { email, password } =  req.body;
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Please fill all fields' });
//         }
//         const user = await User.findOne({ email});
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }
//         const isPasswordCorrect = await user.comparedPassword(password);
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }
//         const token = generateAuthToken(user._id);
//         res.status(200).json({
//             token,
//             user: {
//                 _id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 profileImage: user.profileImage,
//             },
//         });
//    } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// export default router;

import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Generate JWT token
const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
};

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const profileImage = `https://api.dicebear.com/5.x/initials/svg?seed=${username}`;
    const user = new User({
      email,
      username,
      password,
      profileImage,
    });

    await user.save();

    const token = generateAuthToken(user._id);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

   const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateAuthToken(user._id);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

