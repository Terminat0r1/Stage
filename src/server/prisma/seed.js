const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

function generateRandomUsername() {
  // Use a real human name as the username
  return faker.person.fullName();
}

async function seed() {
  try {
    // Create twenty users
    for (let i = 0; i < 20; i++) {
      const username = generateRandomUsername();
      const email = `${username}@example.com`;

      // Use upsert with `create` and `update` options
      const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: {
          username,
          email,
          password: 'password123',
          birthDate: faker.date.between('1980-01-01', '2000-12-31'),
          location: faker.address.city(),
          // Use a realistic profile photo of a person
          profilePhoto: faker.image.avatar(),
          isAdmin: false,
        },
      });

      console.log(`User ${username} created with ID: ${user.id}`);

      // Create three posts for each user using the stored user object
      for (let j = 0; j < 3; j++) {
        const postContent = faker.lorem.paragraph();
        await prisma.post.create({
          data: {
            content: postContent,
            link: 'https://www.youtube.com/watch?v=0hiUuL5uTKc',
            createdAt: new Date(),
            authorId: user.id,
          },
        });
      }
      console.log(`3 Posts created for ${username}`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();