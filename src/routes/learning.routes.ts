import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { prisma } from "../config/prisma";

export const learningRouter = Router();

learningRouter.use(authMiddleware);

// GET /api/learning — List learning articles (filter by topic & language)
learningRouter.get("/", async (req, res, next) => {
  try {
    const { topic, language } = req.query;

    const where: any = {};
    if (topic && typeof topic === "string") {
      where.topic = topic;
    }
    if (language && typeof language === "string") {
      where.language = language;
    }

    const articles = await prisma.learningArticle.findMany({
      where,
      orderBy: { title: "asc" },
      select: {
        id: true,
        title: true,
        topic: true,
        language: true,
        contentUrl: true,
        // Don't include full body in list view for performance
      },
    });

    res.json({ data: articles, error: null });
  } catch (err) {
    next(err);
  }
});

// GET /api/learning/:id — Get a single learning article (with full body)
learningRouter.get("/:id", async (req, res, next) => {
  try {
    const article = await prisma.learningArticle.findUnique({
      where: { id: req.params.id },
    });

    if (!article) {
      res.status(404).json({ data: null, error: { message: "Article not found" } });
      return;
    }

    res.json({ data: article, error: null });
  } catch (err) {
    next(err);
  }
});
