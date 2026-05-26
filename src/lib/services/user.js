import { prisma } from "../prisma";

export const UserService = {
  async deductCredits(userId, amount) {
    return prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: amount } },
    });
  },

  async addCredits(userId, amount) {
    return prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
    });
  },

  async getCredits(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });
    return user?.credits ?? 0;
  },
};
