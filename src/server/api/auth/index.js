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

    // Check if all required fields are provided
    if (!username || !email || !password || !birthDate || !location) {
      const missingFields = [];
      if (!username) missingFields.push("username");
      if (!email) missingFields.push("email");
      if (!password) missingFields.push("password");
      if (!birthDate) missingFields.push("birth date");
      if (!location) missingFields.push("location");

      throw new ServerError(400, `Missing required fields: ${missingFields.join(", ")}.`);
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      throw new ServerError(400, "Invalid email format.");
    }

    // Validate birthDate format
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDateRegex.test(birthDate)) {
      throw new ServerError(400, "Invalid birth date format. Please use the format 'YYYY-MM-DD'.");
    }

    // Parse birthDate to remove the time portion
    let parsedBirthDate;
    try {
      parsedBirthDate = new Date(birthDate); // Attempt to create a Date object from the string
      if (isNaN(parsedBirthDate.getTime())) {
        // If the date is invalid, throw an error
        throw new Error();
      }
    } catch (dateError) {
      throw new ServerError(400, "Invalid birth date. Please provide a valid date in the format 'YYYY-MM-DD'.");
    }

    // Check if location is a number
    if (!isNaN(location)) {
      throw new ServerError(400, "Invalid location. Location cannot be a number.");
    }

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
