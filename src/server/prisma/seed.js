const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateRandomUsername() {
  return `user_${Math.floor(Math.random() * 10000)}`;
}
async function seed() {
  try {
    // Create twenty users
    for (let i = 0; i < 20; i++) {
      const username = generateRandomUsername();
      const email = `user${i}@example.com`;

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: 'password123',
          birthDate: new Date(`1990-01-01`),
          location: 'Pittsburgh',
          profilePhoto: 'https://cdn.costumewall.com/wp-content/uploads/2017/01/pedro-sanchez.jpg',
          isAdmin: false,
        },
      });

      console.log(`User ${username} created`)

      // Create three posts for each user

      for (let j = 0; j < 3; j++) {
        await prisma.post.create({
          data: {
            content: `Post ${j + 1} by ${username}`,
            createAt: new Date(),
            authorId: user.id,
            location: `Billings`,
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
