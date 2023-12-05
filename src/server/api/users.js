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
          select: { id: true, content: true, createdAt: true },
        },
        followers: {
          select: {
            followerId: true,
            userFollowedId: true,
            follower: { select: { id: true } },
            userFollowed: { select: { id: true } },
          },
        },
      },
    });

    if (!userData) {
      throw new ServerError(404, "User not found.");
    }

    const profileInfo = {
      username: userData.username,
      location: userData.location,
      profilePhoto: userData.profilePhoto,
      posts: userData.posts,
      followers: userData.followers,
    };

    res.json(profileInfo);
  } catch (err) {
    console.error('Error in /profile/:id route:', err);
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
          select: { id: true, content: true, createdAt: true, author: { select: { profilePhoto: true } } },
        },
      },
    });
    if (!userData) {
      throw new ServerError(404, "User not found.");
    }
    const posts = userData.posts.map(post => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      authorProfilePhoto: post.author.profilePhoto,
    }));
    res.json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Get users that a specific user is following
router.get('/following/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Fetch users followed by the specified user
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        following: {
          select: {
            userId: true,
            followingId: true,
            createdAt: true,
            user: { select: { id: true, username: true, profilePhoto: true } },
            following: { select: { id: true, username: true, profilePhoto: true } },
          },
        },
      },
    });

    if (!userData) {
      throw new ServerError(404, "User not found.");
    }

    const following = userData.following.map(follower => ({
      userId: follower.userId,
      followingId: follower.followingId,
      createdAt: follower.createdAt,
      user: {
        id: follower.user.id,
        username: follower.user.username,
        profilePhoto: follower.user.profilePhoto,
      },
      following: {
        id: follower.following.id,
        username: follower.following.username,
        profilePhoto: follower.following.profilePhoto,
      },
    }));

    res.json(following);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Get followers of a specific user
router.get('/followers/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Fetch users who are following the specified user
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        followers: {
          select: {
            followerId: true,
            createdAt: true,
            follower: {
              select: {
                id: true,
                username: true,
                profilePhoto: true,
              },
            },
          },
        },
      },
    });

    if (!userData) {
      throw new ServerError(404, "User not found.");
    }

    const followers = userData.followers.map(follower => ({
      followerId: follower.followerId,
      createdAt: follower.createdAt,
      user: {
        id: follower.follower.id,
        username: follower.follower.username,
        profilePhoto: follower.follower.profilePhoto,
      },
    }));

    if (followers.length === 0) {
      console.log(`User with ID ${userId} has no followers.`);
      return res.json({ message: "This user has no followers." });
    }

    console.log(`Followers of user with ID ${userId}:`, followers);
    res.json(followers);
  } catch (err) {
    console.error('Error fetching followers:', err);
    next(err);
  }
});

// Get users by location
router.get('/location/:location', async (req, res, next) => {
  try {
    const location = req.params.location;

    // Fetch users from the specific location with additional details
    const usersInLocation = await prisma.user.findMany({
      where: { location: location },
      select: {
        id: true,
        username: true,
        profilePhoto: true,
        location: true,
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

    // Fetch posts from the specific location with additional details
    const postsInLocation = await prisma.post.findMany({
      where: {
        author: {
          location: location,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            profilePhoto: true,
            location: true,
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
        createdAt: new Date(),
        authorId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            profilePhoto: true,
            location: true,
          },
        },
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating a new post:', error);
    next(error);
  }
});

// Delete a post
router.delete('/posts/:postId', async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.postId);

    // Check if the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });

    if (!existingPost) {
      throw new ServerError(404, 'Post not found.');
    }

    // Check if the user owns the post (is the author)
    if (existingPost.authorId !== userId) {
      throw new ServerError(403, 'You do not have permission to delete this post.');
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting a post:', error);
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
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            profilePhoto: true,
            location: true,
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



















// Get feed of posts from users you are following
router.get('/following/posts', async (req, res, next) => {
  try {
    const userId = res.locals.user.id;

    // Fetch users you are following
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        usersFollowed: {
          select: {
            followedId: true,
          },
        },
      },
    });

    // Extract the list of following user IDs
    const followingUserIds = userData.usersFollowed.map(user => user.followedId);

    // Fetch posts from the followed users
    const feedPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingUserIds,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            profilePhoto: true,
            location: true,
          },
        },
      },
    });

    res.json(feedPosts);
  } catch (error) {
    console.error('Error fetching feed:', error);
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
    const existingFollow = await prisma.follow.findFirst({
      where: { followerId, userFollowedId: userIdToFollow },
    });

    if (existingFollow) {
      throw new ServerError(400, "You are already following this user.");
    }

    // Use Prisma transaction to ensure atomicity
    await prisma.$transaction([
      prisma.follow.create({
        data: {
          followerId,
          userFollowedId: userIdToFollow,
        },
      }),
    ]);

    res.status(201).json({ message: "Successfully followed the user." });
  } catch (error) {
    console.error('Error following a user:', error);
    next(error);
  }
});

// Unfollow a user
router.post('/unfollow/:id', async (req, res, next) => {
  try {
    const followerId = res.locals.user.id;
    const userIdToUnfollow = parseInt(req.params.id);

    // Check if the user to unfollow exists
    const userToUnfollow = await prisma.user.findUnique({
      where: { id: userIdToUnfollow },
    });

    if (!userToUnfollow) {
      throw new ServerError(404, "User to unfollow not found.");
    }

    // Check if the user is currently being followed
    const existingFollow = await prisma.follow.findFirst({
      where: { followerId, userFollowedId: userIdToUnfollow },
    });

    if (!existingFollow) {
      throw new ServerError(400, "You are not following this user.");
    }

    // Remove the follow relationship
    await prisma.follow.delete({
      where: {
        followerId_userFollowedId: {
          followerId,
          userFollowedId: userIdToUnfollow,
        },
      },
    });

    res.status(200).json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    console.error('Error unfollowing a user:', error);
    next(error);
  }
});

// Update user profile information
router.put('/update-profile', async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { username, email, birthDate, location, newPassword, oldPassword, profilePhoto } = req.body;

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
        profilePhoto: profilePhoto || user.profilePhoto,
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

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user profile:', error);
    next(error);
  }
});

module.exports = router;