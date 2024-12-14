const User = require('../models/userModel');

exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
      }
  
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  