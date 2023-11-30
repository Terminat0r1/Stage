const { ServerError } = require("../errors");
const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;
// User must be logged in to access features.
router.use((req, res, next) => {
  if (!res.locals.user) {
    return next(new ServerError(401, "You must be logged in."));
  }
  next();
});
// Get user profile information
router.get('/profile/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    // Fetch user data including posts and followers
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          select: { id: true, content: true, createAt: true },
        },
        followers: {
          select: { id: true },
        },
      },
    });
    if (!userData) {
      throw new ServerError(404, "User not found.");
    }
    const profileInfo = {
      username: userData.username,
      location: userData.location,
      posts: userData.posts,
      followers: userData.followers,
    };
    res.json(profileInfo);
  } catch (err) {
    console.error(err);
    next(err);
  }
});














