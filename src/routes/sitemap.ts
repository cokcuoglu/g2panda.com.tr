import express, { Request, Response } from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import logger from '../config/logger';
import { query } from '../db'; // Optional: if you actually want to pull real blog posts from DB later

const router = express.Router();

let sitemapCache: Buffer | null = null;
let sitemapCacheTime: number | null = null;
const CACHE_KEY = 'sitemap_cache';
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour cache

router.get('/', async (req: Request, res: Response) => {
    try {
        res.header('Content-Type', 'application/xml');
        res.header('Content-Encoding', 'gzip');

        const now = Date.now();

        // Serve from cache if valid
        if (sitemapCache && sitemapCacheTime && (now - sitemapCacheTime < CACHE_TTL_MS)) {
            return res.send(sitemapCache);
        }

        const smStream = new SitemapStream({ hostname: 'https://g2panda.com.tr' });
        const pipeline = smStream.pipe(createGzip());

        // Stream to promise to cache the result
        const sitemapPromise = streamToPromise(pipeline).then((sm) => {
            sitemapCache = sm;
            sitemapCacheTime = Date.now();
            return sm;
        });

        // 1. Static Routes
        smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/features', changefreq: 'weekly', priority: 0.8 });
        smStream.write({ url: '/qr-menu', changefreq: 'weekly', priority: 0.8 });
        smStream.write({ url: '/blog', changefreq: 'daily', priority: 0.7 });
        smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.5 });

        // 2. Dynamic Routes: Example Blog Posts
        // In reality, you'd fetch this from your database:
        /*
        const { rows } = await query('SELECT slug, updated_at FROM blog_posts WHERE status = $1', ['published']);
        for (const post of rows) {
             smStream.write({ 
                 url: `/blog/${post.slug}`, 
                 lastmod: post.updated_at,
                 changefreq: 'weekly', 
                 priority: 0.7 
             });
        }
        */

        // Hardcoded example for the active blog post we just built
        smStream.write({
            url: '/blog', // We currently have the blog detail hardcoded at /blog instead of a slug list, but let's adhere strictly to what was built
            lastmod: '2026-03-03T12:00:00.000Z',
            changefreq: 'weekly',
            priority: 0.7
        });

        smStream.end();

        // Send the generated sitemap
        const sitemapBuffer = await sitemapPromise;
        res.send(sitemapBuffer);

    } catch (e) {
        logger.error('Sitemap Generator Error:', e);
        res.status(500).end();
    }
});

export default router;
