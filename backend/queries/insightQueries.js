const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await getReactionCountsByProduct('7218abae-c2a8-423b-946d-55dcc610ef38')
}

async function getReactionCountsByProduct(userId) {
    const reactions = await prisma.skinReaction.groupBy({
        by: ['usageLogId'],
        where: {
            userId
        },
        _count: {
            id: true
        }
    })

    const detailed = await Promise.all(
        reactions.map(async (r) => {
            const usageLog = await prisma.usageLog.findUnique({
                where: { id: r.usageLogId },
                include: { 
                    userProduct: {
                        include: { product: true }
                    }
                }
            })

            return {
                productName: usageLog.userProduct.product.name,
                reactionCount: r._count.id
            }
        })
    )
    console.log(detailed)
}

main()
    .catch(console.error)
    .finally(async () => prisma.$disconnect())