const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await getUserSkinReactions('7218abae-c2a8-423b-946d-55dcc610ef38')
}

// fetch skin reactions of a user
async function getUserSkinReactions(userId) {
    const reactions = await prisma.skinReaction.findMany({
        where: { userId: '7218abae-c2a8-423b-946d-55dcc610ef38'},
        include: {
            usageLog: {
                include: {
                    userProduct: { include: { product: true} },
                    routine: true
                }
            }
        },
        orderBy: { reportedAt: 'desc'}
    })
    console.log(JSON.stringify(reactions, null, 2))
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())