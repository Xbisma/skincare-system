const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

// fetch all users
async function getAllUsers() {
    const users = await prisma.user.findMany()
    console.log(users)
}
// fetch user with their products
async function getUserWithProducts(userId) {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            userProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    console.log(JSON.stringify(user, null, 2))
}
async function main() {
    await getAllUsers()
    await getUserWithProducts('7218abae-c2a8-423b-946d-55dcc610ef38')
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())