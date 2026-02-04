const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

// fetch all routines of a user along with its steps and products
async function getUserRoutinesWithSteps(userId) {
   const routines = await prisma.routine.findMany({
    where: { userId: "7218abae-c2a8-423b-946d-55dcc610ef38" },
    include: {
        steps: {
            orderBy: { stepOrder: 'asc' },
            include: {
                userProduct: {
                    include: {
                        product: true
                    }
                }
            }
        }
    }
})
    console.log(JSON.stringify(routines, null, 2))
}
async function main() {
    await getUserRoutinesWithSteps('7218abae-c2a8-423b-946d-55dcc610ef38')
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())