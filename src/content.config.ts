import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod/v4';

const nonEmpty = z.string().trim().min(1);

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: nonEmpty,
    category: nonEmpty,
    description: nonEmpty,
    image: nonEmpty,
    imageAlt: nonEmpty,
    seoCheck: z.any().optional()
  })
});

const productCategories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/product-categories' }),
  schema: z.object({
    name: nonEmpty,
    description: nonEmpty,
    order: z.number().int().positive()
  })
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: nonEmpty,
    date: z.date(),
    description: nonEmpty,
    excerpt: nonEmpty,
    coverImage: nonEmpty,
    coverImageAlt: nonEmpty,
    tags: z.array(nonEmpty).default([]),
    seoCheck: z.any().optional()
  })
});

const factories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/factories' }),
  schema: z.object({
    name: nonEmpty,
    address: nonEmpty,
    order: z.number().int().positive()
  })
});

export const collections = { products, productCategories, blog, factories };
