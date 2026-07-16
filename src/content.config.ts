import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod/v4';

const nonEmpty = z.string().trim().min(1);
const language = z.enum(['vi', 'en', 'zh']).default('vi');

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    language,
    name: nonEmpty,
    category: nonEmpty,
    description: nonEmpty,
    image: nonEmpty,
    imageAlt: nonEmpty,
    gallery: z.array(nonEmpty).default([]),
    seoCheck: z.any().optional()
  })
});

const productCategories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/product-categories' }),
  schema: z.object({
    language,
    name: nonEmpty,
    description: nonEmpty,
    order: z.number().int().positive()
  })
});

const homeBanners = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home-banners' }),
  schema: z.object({
    language,
    title: nonEmpty,
    description: nonEmpty,
    image: nonEmpty,
    imageAlt: nonEmpty,
    order: z.number().int().positive()
  })
});

const homeSettings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home-settings' }),
  schema: z.object({
    language,
    videoUrl: nonEmpty,
    videoTitle: nonEmpty,
    videoDescription: nonEmpty
  })
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    language,
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
    language,
    name: nonEmpty,
    address: nonEmpty,
    order: z.number().int().positive()
  })
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    language,
    section: z.enum(['history', 'vision', 'organization']),
    title: nonEmpty,
    summary: nonEmpty
  })
});

const certifications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certifications' }),
  schema: z.object({
    language,
    name: nonEmpty,
    description: nonEmpty,
    order: z.number().int().positive()
  })
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    language,
    title: nonEmpty,
    client: nonEmpty,
    summary: nonEmpty,
    metric: nonEmpty,
    order: z.number().int().positive()
  })
});

const clients = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/clients' }),
  schema: z.object({
    language,
    name: nonEmpty,
    logo: z.string().trim().optional(),
    url: z.string().trim().optional(),
    order: z.number().int().positive()
  })
});

export const collections = { products, productCategories, homeBanners, homeSettings, blog, factories, about, certifications, caseStudies, clients };
