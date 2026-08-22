import type { MetadataRoute } from "next";
import { getAllRecipes } from "@/lib/recipes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await getAllRecipes();

  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://dadskitchen.org", changeFrequency: "weekly", priority: 1 },
    {
      url: "https://dadskitchen.org/about",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://dadskitchen.org/recipes",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://dadskitchen.org/watch",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://dadskitchen.org/blog",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://dadskitchen.org/resources",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://dadskitchen.org/get-involved",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://dadskitchen.org/contact",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://dadskitchen.org/about/transparency",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://dadskitchen.org/process/spread-the-word",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://dadskitchen.org/process/participate",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://dadskitchen.org/process/be-an-example",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://dadskitchen.org/process/guest-chef",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `https://dadskitchen.org/recipes/${recipe.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...recipePages];
}
