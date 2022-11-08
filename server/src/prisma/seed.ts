import { PrismaClient } from '@prisma/client';
import { userProfiles } from './data';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const hashedUserProfiles = userProfiles.map((user) => {
  return {
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  };
});

async function main() {
  for (const userProfile of hashedUserProfiles) {
    await prisma.user.create({
      data: {
        ...userProfile,
        profile: {
          create: userProfile.profile,
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
