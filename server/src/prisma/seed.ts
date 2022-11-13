import { PrismaClient } from '@prisma/client';
import { userProfiles, reviewText } from './data';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const hashedUserProfiles = userProfiles.map((user) => {
  return {
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  };
});

const tutorProfileIds = [];
const studentUserIds = [];

async function main() {
  for (const userProfile of hashedUserProfiles) {
    const {
      id: userId,
      role,
      profile: { id: profileId },
    } = await prisma.user.create({
      data: {
        ...userProfile,
        profile: {
          create: userProfile.profile,
        },
      },
      include: {
        profile: true,
      },
    });

    if (role === 'STUDENT') studentUserIds.push(userId);
    else tutorProfileIds.push(profileId);
  }

  for (let i = 0; i < 50; i++) {
    await prisma.review.create({
      data: {
        text: reviewText[Math.floor(Math.random() * reviewText.length)],
        rating: Math.floor(Math.random() * 6),
        profile: {
          connect: {
            id: tutorProfileIds[
              Math.floor(Math.random() * tutorProfileIds.length)
            ],
          },
        },
        user: {
          connect: {
            id: studentUserIds[
              Math.floor(Math.random() * studentUserIds.length)
            ],
          },
        },
      },
    });
  }

  console.log('db seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
