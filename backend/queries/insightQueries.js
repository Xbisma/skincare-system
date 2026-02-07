const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await getReactionCountsByProduct('7218abae-c2a8-423b-946d-55dcc610ef38')
    await getMostUsedProducts('7218abae-c2a8-423b-946d-55dcc610ef38')
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

async function getMostUsedProducts(userId) {
        const result = await prisma.usageLog.groupBy({
            by: ['userProductId'],
            where: { userId: userId },
            _count: {
                userProductId: true
            },
            orderBy: {
                _count: {
                    userProductId: 'desc'
                }
            }
        })

        const enriched = await Promise.all(
            result.map(async (item) => {
                const userProduct = await prisma.userProduct.findUnique({
                    where: { id: item.userProductId },
                    include: { product: true }
                })

                return {
                    productName: userProduct.product.name,
                    productType: userProduct.product.category,
                    usageCount: item._count.userProductId
                }
            })
        )

        console.log(enriched)
}
main()
    .catch(console.error)
    .finally(async () => prisma.$disconnect())