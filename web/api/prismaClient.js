// prismaClient.js
const { PrismaClient } = require('@prisma/client')

// 🔹 Cria uma única instância do PrismaClient (para evitar múltiplas conexões)
const prisma = new PrismaClient()

module.exports = prisma
