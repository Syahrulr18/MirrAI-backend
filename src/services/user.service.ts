import { prisma } from "../config/prisma";

interface SyncUserInput {
  id: string;
  email: string;
  displayName?: string;
}

interface UpdateUserInput {
  displayName?: string;
  preferredLanguage?: string;
}

export const userService = {
  /**
   * Sync user from Supabase Auth → local DB.
   * Creates if not exists, returns existing if found.
   */
  async syncUser(input: SyncUserInput) {
    const existing = await prisma.user.findUnique({
      where: { id: input.id },
    });

    if (existing) return existing;

    return prisma.user.create({
      data: {
        id: input.id,
        email: input.email,
        displayName: input.displayName || null,
      },
    });
  },

  /**
   * Get user by ID with related data counts.
   */
  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        streak: true,
        _count: {
          select: {
            sessions: true,
            badges: true,
          },
        },
      },
    });
  },

  /**
   * Update user profile fields.
   */
  async updateUser(userId: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  },
};
