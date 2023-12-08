const { ServerError } = require("../../errors");
const prisma = require("../../prisma");
const jwt = require("./jwt");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { parse } = require("date-fns");
module.exports = router;



// Creates a new account and returns a token
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, birthDate, location, isAdmin } = req.body;

    if (!username || !password || !birthDate || !location) {
      throw new ServerError(400, "Username, password, birthDate, and location are required.");
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      throw new ServerError(400, "Invalid email format.");
    }

    // Parse birthDate to remove the time portion
    const parsedBirthDate = parse(birthDate, 'yyyy-MM-dd', new Date());

    // Check if an account with the provided email already exists
    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });

    // Check if an account with the provided username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser && existingEmailUser) {
      throw new ServerError(
        400,
        `Account with the username "${username}" and email "${email}" already exists.`
      );
    } else if (existingUser) {
      throw new ServerError(
        400,
        `Account with the username "${username}" already exists.`
      );
    } else if (existingEmailUser) {
      throw new ServerError(
        400,
        `Account with the email "${email}" already exists.`
      );
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        birthDate: parsedBirthDate,
        location,
        isAdmin,
      },
    });

    const token = jwt.sign({ id: newUser.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});





//Returns token for account if credentials valid
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if username and password provided
    if (!username || !password) {
      throw new ServerError(400, "Username and password required.");
    }

    // Check if account exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new ServerError(
        400,
        `Account with username ${username} does not exist.`
      );
    }

    // Check if password is correct
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new ServerError(401, "Invalid password.");
    }

    const token = jwt.sign({ id: user.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});
