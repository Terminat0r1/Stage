const { ServerError } = require("../errors");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");

const router = require("express").Router();
module.exports = router;

// User must be logged in to access features
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

// Get user posts
router.get('/profile/:id/posts', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    // Fetch user posts
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          select: { id: true, content: true, createAt: true },
        },
      },
    });
    if (!userData) {
      throw new ServerError(404, "User not found.");
    }
    const posts = userData.posts.map(post => ({
      id: post.id,
      content: post.content,
      createAt: post.createAt,
    }));
    res.json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Get users you are following
router.get('/profile/:id/following', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    // Fetch user followers
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        followers: {
          select: {
            userId: true,
            followerId: true,
            createAt: true,
            user: { select: { id: true, username: true } },
            follower: { select: { id: true, username: true } }
          },
        },
      },
    });

    if (!userData) {
      throw new ServerError(404, "User not found.");
    }

    const followers = userData.followers.map(follower => ({
      userId: follower.userId,
      followerId: follower.followerId,
      createAt: follower.createAt,
      user: {
        id: follower.user.id,
        username: follower.user.username,
      },
      follower: {
        id: follower.follower.id,
        username: follower.follower.username,
      },
    }));

    res.json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Get followers of a specific user
router.get('/profile/:id/followers', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    // Fetch users followed by the user
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        following: {
          select: {
            userId: true,
            followerId: true,
            createAt: true,
            user: { select: { id: true, username: true } },
            follower: { select: { id: true, username: true } }
          },
        },
      },
    });

    if (!userData) {
      throw new ServerError(404, "User not found.");
    }

    const following = userData.following.map(follower => ({
      userId: follower.userId,
      followerId: follower.followerId,
      createAt: follower.createAt,
      user: {
        id: follower.user.id,
        username: follower.user.username,
      },
      follower: {
        id: follower.follower.id,
        username: follower.follower.username,
      },
    }));

    res.json(following);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Get users by location
router.get('/location/:location', async (req, res, next) => {
  try {
    const location = req.params.location;
    // Fetch users from the specific location
    const usersInLocation = await prisma.user.findMany({
      where: { location: location },
      select: {
        id: true,
        username: true,
      },
    });

    res.json(usersInLocation);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Get posts from a specific location
router.get('/posts/location/:location', async (req, res, next) => {
  try {
    const location = req.params.location;
    // Fetch posts from the specific location
    const postsInLocation = await prisma.post.findMany({
      where: { 
        author: {
          location: location,
        },
      },
      select: {
        id: true,
        content: true,
        createAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json(postsInLocation);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Create a new post
router.post('/posts', async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = res.locals.user.id;

    const newPost = await prisma.post.create({
      data: {
        content,
        createAt: new Date(),
        authorId: userId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating a new post:', error);
    next(error);
  }
});

// Get details of a specific post
router.get('/posts/:postId', async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    // Fetch post details
    const postDetails = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        content: true,
        createAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!postDetails) {
      throw new ServerError(404, "Post not found.");
    }

    res.json(postDetails);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Get feed of posts from followed users
router.get('/feed/posts', async (req, res, next) => {
  try {
    const userId = res.locals.user.id;

    // Fetch the list of users that the current user is following
    const followingList = await prisma.userFollowers.findMany({
      where: {
        userId: userId,
      },
      select: {
        followerId: true,
      },
    });

    // Extract the list of follower IDs
    const followerIds = followingList.map(item => item.followerId);
    // Fetch posts from users in the follower list
    const feedPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followerIds,
        },
      },
      select: {
        id: true,
        content: true,
        createAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createAt: 'desc',
      },
    });

    res.json(feedPosts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Delete a post
router.delete('/posts/:postId', async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = res.locals.user.id;

    // Check if the post exists and belongs to the authenticated user
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });

    if (!post) {
      throw new ServerError(404, 'Post not found.');
    }

    if (post.authorId !== userId) {
      throw new ServerError(403, 'You do not have permission to delete this post.');
    }

    // Delete the post
    await prisma.post.delete({ where: { id: postId } });

    res.status(204).end(); // No content after successful deletion
  } catch (error) {
    console.error('Error deleting the post:', error);
    next(error);
  }
});

// Follow a user
router.post('/follow/:id', async (req, res, next) => {
  try {
    const followerId = res.locals.user.id;
    const userIdToFollow = parseInt(req.params.id);

    // Check if the user to follow exists
    const userToFollow = await prisma.user.findUnique({
      where: { id: userIdToFollow },
    });

    if (!userToFollow) {
      throw new ServerError(404, "User to follow not found.");
    }

    // Check if the user is already being followed
    const existingFollow = await prisma.userFollowers.findFirst({
      where: { userId: userIdToFollow, followerId },
    });

    if (existingFollow) {
      throw new ServerError(400, "You are already following this user.");
    }

    // Create a new follow relationship
    await prisma.userFollowers.create({
      data: {
        userId: userIdToFollow,
        followerId,
        createAt: new Date(),
      },
    });

    res.status(201).json({ message: "Successfully followed the user." });
  } catch (error) {
    console.error('Error following a user:', error);
    next(error);
  }
});

// Unfollow a user
router.post('/unfollow/:id', async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const userToUnfollowId = parseInt(req.params.id);

    // Check if the user is already following the userToUnfollow
    const existingFollow = await prisma.userFollowers.findFirst({
      where: {
        userId: userToUnfollowId,
        followerId: userId,
      },
    });

    if (!existingFollow) {
      // User is not following the specified user
      return res.status(400).json({ error: "You are not following this user." });
    }

    // Unfollow the user
    await prisma.userFollowers.delete({
      where: {
        id: existingFollow.id,
      },
    });

    // Respond with a success message
    res.json({ message: "Unfollowed successfully." });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Update user profile information, including password
router.put('/update-profile', async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { username, email, birthDate, location, newPassword, oldPassword } = req.body;

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ServerError(404, "User not found.");
    }

    // If updating the password, validate the old password
    if (newPassword) {
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid old password." });
      }
    }

    // Update user profile information
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username || user.username,
        email: email || user.email,
        birthDate: birthDate || user.birthDate,
        location: location || user.location,
        // Hash the new password before storing it
        password: newPassword ? await bcrypt.hash(newPassword, 10) : user.password,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Delete user profile
router.delete('/profile', async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { password } = req.body;

    // Fetch user data including the password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new ServerError(404, 'User not found.');
    }

    // Check if the provided password is correct
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new ServerError(401, 'Incorrect password.');
    }

    // Delete the user
    await prisma.user.delete({ where: { id: userId } });

    res.status(204).end(); // No content after successful deletion
  } catch (error) {
    console.error('Error deleting user profile:', error);
    next(error);
  }
});

module.exports = router;
