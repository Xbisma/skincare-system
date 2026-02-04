require('dotenv').config()

const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
    const hashedPassoword = await bcrypt.hash('password1233', 10)

    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            passwordHash: hashedPassoword,
            name: 'Test User',
            skinType: 'OILY'
        }
    })

    const cleanser = await prisma.product.create({
        data: {
            name: 'Gentle Cleanser',
            brand: 'CleanCo',
            category: 'CLEANSER'
        }
    })

    const exfoliant = await prisma.product.create({
        data: {
            name: 'AHA Exfoliant',
            brand: 'ExfoBrand',
            category: 'EXFOLIANT'
        }
    })

    const userCleanser = await prisma.userProduct.create({
        data: {
            userId: user.id,
            productId: cleanser.id,
            openDate: new Date('2025-01-01'),
            expiryDate: new Date('2025-06-01'),
            paoMonths: 6,
            notes: 'Great for daily use'
        }
    })

    const userExfoliant = await prisma.userProduct.create({
        data: {
            userId: user.id,
            productId: exfoliant.id,
            openDate: new Date('2025-01-10'),
            expiryDate: new Date('2025-04-10'),
            paoMonths: 12,
            notes: 'Use twice a week'
        }
    })

    const routine = await prisma.routine.create({
        data: {
            userId: user.id,
            name: 'Evening Routine',
            routineTime: 'PM'
        }
    })

    await prisma.routineStep.createMany({
        data: [
            {
                routineId: routine.id,
                userProductId: userCleanser.id,
                stepOrder: 1,
                instructions: 'Apply to damp face and rinse thoroughly.'
            },
            {
                routineId: routine.id,
                userProductId: userExfoliant.id,
                stepOrder: 2,
                instructions: 'Apply a small amount to face, avoiding eyes.'
            }
        ]
    })

    const usageCleanser = await prisma.usageLog.create({
        data: {
                userId: user.id,
                userProductId: userCleanser.id,
                routineId: routine.id,
                usedAt: new Date(),
                notes: 'Left skin feeling fresh'
            }
    })
    const usageExfoliant = await prisma.usageLog.create({
        data: {
            userId: user.id,
            userProductId: userExfoliant.id,
            routineId: routine.id,
            usedAt: new Date(),
            notes: 'Skin felt smooth afterward'
            }
    })

    await prisma.skinReaction.create({
        data: {
            userId: user.id,
            usageLogId: usageCleanser.id,
            reaction: 'IRRITATION',
            severity: 3,
            notes: 'Mild burning sensation',
            reportedAt: new Date()
        }
    })
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())