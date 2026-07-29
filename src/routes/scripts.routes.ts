import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { prisma } from "../config/prisma";

export const scriptsRouter = Router();

scriptsRouter.use(authMiddleware);

// GET /api/scripts — List script templates (filter by category & language)
scriptsRouter.get("/", async (req, res, next) => {
  try {
    const { category, language } = req.query;

    const where: any = {};
    if (category && typeof category === "string") {
      where.category = category;
    }
    if (language && typeof language === "string") {
      where.language = language;
    }

    const scripts = await prisma.scriptTemplate.findMany({
      where,
      orderBy: { title: "asc" },
    });

    res.json({ data: scripts, error: null });
  } catch (err) {
    next(err);
  }
});

// GET /api/scripts/:id — Get a single script template
scriptsRouter.get("/:id", async (req, res, next) => {
  try {
    const script = await prisma.scriptTemplate.findUnique({
      where: { id: req.params.id },
    });

    if (!script) {
      res.status(404).json({ data: null, error: { message: "Script not found" } });
      return;
    }

    res.json({ data: script, error: null });
  } catch (err) {
    next(err);
  }
});
