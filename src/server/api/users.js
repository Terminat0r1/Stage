const { ServerError } = require("../errors");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const { parseISO } = require('date-fns');

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
router.get("/profile/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Fetch user data including posts and followers
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          include: {
            likes: {
              select: {
                likerId: true,
              },
            },
          },
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
      aboutMe: userData.aboutMe,
      posts: userData.posts.map((post) => ({
        id: post.id,
        content: post.content,
        createdAt: post.createdAt,
        likes: post.likes.map((like) => ({ likerId: like.likerId })),
      })),
      followers: userData.followers,
    };

    res.json(profileInfo);
  } catch (err) {
    console.error("Error in /profile/:id route:", err);
    next(err);
  }
});




// Get signed in user's ID
router.get('/user-id', (req, res, next) => {
  try {
    const userId = res.locals.user.id;

    // Respond with the user ID
    res.json({ userId });
  } catch (err) {
    console.error('Error in /user-id route:', err);
    next(err);
  }
});





// Get user posts
router.get("/profile/:id/posts", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Fetch user posts including likes
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          include: {
            likes: {
              select: {
                likerId: true,
              },
            },
            author: {
              select: {
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

    // Transform the data for response
    const posts = userData.posts.map((post) => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      authorProfilePhoto: post.author.profilePhoto,
      likes: post.likes.map((like) => ({
        likerId: like.likerId,
      })),
    }));

    res.json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Get users followed by a specific user
router.get("/profile/:id/following", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Fetch user data including users followed
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        usersFollowed: {
          select: {
            userFollowedId: true,
            userFollowed: {
              select: {
                id: true,
                username: true,
                profilePhoto: true,
                location: true,
              },
            },
          },
        },
      },
    });

    if (!userData) {
      throw new ServerError(404, "User not found.");
    }

    if (userData.usersFollowed.length === 0) {
      return res
        .status(200)
        .json({ message: "This user is not following anyone." });
    }

    const followingInfo = userData.usersFollowed.map((followedUser) => ({
      id: followedUser.userFollowed.id,
      username: followedUser.userFollowed.username,
      profilePhoto: followedUser.userFollowed.profilePhoto,
      location: followedUser.userFollowed.location,
    }));

    res.json(followingInfo);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Get followers of a specific user
router.get("/profile/:id/followers", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    // Fetch user data including followers
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        followers: {
          select: {
            followerId: true,
            follower: {
              select: {
                id: true,
                username: true,
                profilePhoto: true,
                location: true,
              },
            },
          },
        },
      },
    });

    if (!userData) {
      throw new ServerError(404, "User not found.");
    }

    const followersInfo = userData.followers.map((follower) => ({
      id: follower.follower.id,
      username: follower.follower.username,
      profilePhoto: follower.follower.profilePhoto,
      location: follower.follower.location,
    }));

    res.json(followersInfo);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Get users by location
router.get("/location/:location", async (req, res, next) => {
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

    if (usersInLocation.length === 0) {
      throw new ServerError(404, `No users found for the location "${location}".`);
    }

    res.json(usersInLocation);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Get user posts from a specific location
router.get("/posts/location/:location", async (req, res, next) => {
  try {
    const location = req.params.location;

    // Fetch posts from the specific location with additional details including author and likes
    const postsInLocation = await prisma.post.findMany({
      where: {
        author: {
          location: location,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profilePhoto: true,
            location: true,
          },
        },
        likes: {
          select: {
            likerId: true,
          },
        },
      },
    });

    if (postsInLocation.length === 0) {
      throw new ServerError(404, `No posts found for the location "${location}".`);
    }

    res.json(postsInLocation);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Create a new post
router.post("/posts", async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = res.locals.user.id;

    // Check if the content is an empty string
    if (!content.trim()) {
      throw new ServerError(400, "Post content cannot be empty.");
    }

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
    console.error("Error creating a new post:", error);
    next(error);
  }
});





// Delete a post
router.delete("/posts/:postId", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.postId);

    // Check if the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });

    if (!existingPost) {
      throw new ServerError(404, "Post not found.");
    }

    // Check if the user owns the post (is the author)
    if (existingPost.authorId !== userId) {
      throw new ServerError(
        403,
        "You do not have permission to delete this post."
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting a post:", error);
    next(error);
  }
});





// Get details of a specific post
router.get("/posts/:postId", async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);

    // Fetch post details including author and likes
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
        likes: {
          select: {
            likerId: true,
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
router.get("/vibe", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;

    // Fetch users you are following
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        usersFollowed: {
          select: {
            userFollowedId: true,
          },
        },
      },
    });

    // Extract the list of following user IDs
    const followingUserIds = userData.usersFollowed.map(
      (user) => user.userFollowedId
    );

    // Fetch posts from the followed users with additional details including author and likes
    const feedPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingUserIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profilePhoto: true,
            location: true,
          },
        },
        likes: {
          select: {
            likerId: true,
          },
        },
      },
    });

    res.json(feedPosts);
  } catch (error) {
    console.error("Error fetching feed:", error);
    next(error);
  }
});





// Get feed of posts from users not followed by the current user
router.get("/stage", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;

    // Fetch users you are following
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        usersFollowed: {
          select: {
            userFollowedId: true,
          },
        },
      },
    });

    // Extract the list of following user IDs
    const followingUserIds = userData.usersFollowed.map(
      (user) => user.userFollowedId
    );

    // Fetch posts from users not followed by the current user with additional details including author and likes
    const feedPostsNotFollowing = await prisma.post.findMany({
      where: {
        authorId: {
          notIn: [userId, ...followingUserIds],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profilePhoto: true,
            location: true,
          },
        },
        likes: {
          select: {
            likerId: true,
          },
        },
      },
    });

    res.json(feedPostsNotFollowing);
  } catch (error) {
    console.error("Error fetching feed of posts not followed:", error);
    next(error);
  }
});





// Follow a user
router.post("/follow/:id", async (req, res, next) => {
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
    console.error("Error following a user:", error);
    next(error);
  }
});





// Unfollow a user
router.post("/unfollow/:id", async (req, res, next) => {
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
    console.error("Error unfollowing a user:", error);
    next(error);
  }
});





// Like a post
router.post("/posts/:postId/like", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.postId);

    // Check if the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });

    if (!existingPost) {
      throw new ServerError(404, "Post not found.");
    }

    // Check if the user has already liked the post
    const existingLike = await prisma.like.findFirst({
      where: { likerId: userId, postLikedId: postId },
    });

    if (existingLike) {
      throw new ServerError(400, "You have already liked this post.");
    }

    // Create a new Like record
    const newLike = await prisma.like.create({
      data: {
        likerId: userId,
        postLikedId: postId,
      },
      select: {
        liker: {
          select: {
            id: true,
            username: true,
            profilePhoto: true,
            location: true,
          },
        },
        postLiked: {
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
        },
      },
    });

    res.status(201).json(newLike);
  } catch (error) {
    console.error("Error liking a post:", error);
    next(error);
  }
});





// Unlike a post
router.delete("/posts/:postId/unlike", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.postId);

    // Check if the user has liked the post
    const existingLike = await prisma.like.findFirst({
      where: { likerId: userId, postLikedId: postId },
      select: { likerId: true, postLikedId: true },
    });

    if (!existingLike) {
      throw new ServerError(400, "You have not liked this post.");
    }

    // Delete the like relationship using the retrieved id
    await prisma.like.delete({
      where: {
        likerId_postLikedId: {
          likerId: existingLike.likerId,
          postLikedId: existingLike.postLikedId,
        },
      },
    });

    res.status(200).json({ message: "Successfully unliked the post." });
  } catch (error) {
    console.error("Error unliking a post:", error);
    next(error);
  }
});





// Update username
router.put("/update-username", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { username } = req.body;

    // Check if the new username already exists
    const existingUserWithUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUserWithUsername) {
      throw new ServerError(400, "Username is already in use.");
    }

    // Update username
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Update email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.put("/update-email", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { email } = req.body;

    // Validate email format
    if (!emailRegex.test(email)) {
      throw new ServerError(400, "Invalid email format.");
    }

    // Check if the new email is already in use
    const existingUserWithEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserWithEmail) {
      throw new ServerError(400, "Email is already in use.");
    }

    // Update email
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Update birth date
router.put("/update-birthdate", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    let { birthDate } = req.body;

    // Parse birthDate to ensure it's in the correct format
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!birthDateRegex.test(birthDate)) {
      throw new ServerError(400, "Invalid birth date format. Please use the format 'YYYY-MM-DD'.");
    }

    // Convert the string to a Date object
    birthDate = new Date(birthDate);

    // Check if the Date object is valid
    if (isNaN(birthDate.getTime())) {
      throw new ServerError(400, "Invalid birth date. Please provide a valid date.");
    }

    // Update birthDate
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { birthDate },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Update location
router.put("/update-location", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { location } = req.body;

    // Check if location is a number
    if (!isNaN(location)) {
      throw new ServerError(400, "Invalid location. Location cannot be a number.");
    }

    // Update location
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { location },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Update profile photo
router.put("/update-profile-photo", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { profilePhoto } = req.body;

    // Update profilePhoto
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePhoto },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Update about me
router.put('/update-about-me', async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { aboutMe } = req.body;

    // Update aboutMe
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { aboutMe },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Update password
router.put("/update-password", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { newPassword, oldPassword } = req.body;

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ServerError(404, "User not found.");
    }

    // Validate the old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid old password.");
    }

    // Update password
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        password: await bcrypt.hash(newPassword, 10),
      },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});





// Delete user profile
router.delete("/profile", async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const { password } = req.body;

    // Fetch user data including the password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new ServerError(404, "User not found.");
    }

    // Check if the provided password is correct
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new ServerError(401, "Incorrect password.");
    }

    // Delete the user
    await prisma.user.delete({ where: { id: userId } });

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user profile:", error);
    next(error);
  }
});





module.exports = router;
