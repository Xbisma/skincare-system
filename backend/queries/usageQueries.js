const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await getUserUsageLogs('7218abae-c2a8-423b-946d-55dcc610ef38')
}

// fetch usage logs of a user along with related routine and products and their reactions
async function getUserUsageLogs(userId) {
    const usageLogs = await prisma.usageLog.findMany({
        where: { userId: '7218abae-c2a8-423b-946d-55dcc610ef38'},
        include: {
            routine: true,
            userProduct: {
                include: { product: true}
            },
            reactions: true
        },
        orderBy: { usedAt: 'desc'}
    })
    console.log(JSON.stringify(usageLogs, null, 2))
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())