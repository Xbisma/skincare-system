const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

// fetch all users
async function getAllUsers() {
    const users = await prisma.user.findMany()
    console.log(users)
}
async function main() {
    await getAllUsers()
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())