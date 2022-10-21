import { PrismaClient } from '@prisma/client'
import { add } from 'date-fns'

const prisma = new PrismaClient()

// A 'main' function so that we can use async/await
async function main() {
    //await prisma.user.deleteMany({}) // should not be done in production

    const Joe = await prisma.user.create({
        data: {
            email: 'joeneedum@gmail.com',
            firstName: 'Chris',
            lastName: 'Needham',
        }
    })
    console.log(Joe)
}

main()
    .catch((e: Error) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        // Disconnect Prisma Client
        await prisma.$disconnect()
    })