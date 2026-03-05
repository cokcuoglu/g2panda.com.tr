import express, { Request, Response } from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';
import logger from '../config/logger';
import { query } from '../db';

const router = express.Router();

let sitemapCache: string | null = null;
let sitemapCacheTime: number | null = null;
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour cache

router.get('/', async (req: Request, res: Response) => {
    try {
        res.header('Content-Type', 'application/xml');

        const now = Date.now();

        // Serve from cache if valid
        if (sitemapCache && sitemapCacheTime && (now - sitemapCacheTime < CACHE_TTL_MS)) {
            return res.send(sitemapCache);
        }

        const smStream = new SitemapStream({ hostname: 'https://g2panda.com.tr' });

        // Generate the sitemap as a Promise, converting Buffer to String immediately
        const sitemapPromise = streamToPromise(smStream).then((sm) => sm.toString());

        // 1. Static Routes
        smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/features', changefreq: 'weekly', priority: 0.8 });
        smStream.write({ url: '/qr-menu', changefreq: 'weekly', priority: 0.8 });
        smStream.write({ url: '/blog', changefreq: 'daily', priority: 0.7 });
        smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.5 });

        // 2. Dynamic Routes: Example Blog Posts
        // Un-comment and modify when you have a blog table:
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

        // Hardcoded example for the active blog post
        smStream.write({
            url: '/blog',
            lastmod: '2026-03-03T12:00:00.000Z',
            changefreq: 'weekly',
            priority: 0.7
        });

        smStream.end();

        // Send the generated sitemap
        const sitemapXml = await sitemapPromise;
        sitemapCache = sitemapXml;
        sitemapCacheTime = Date.now();

        res.send(sitemapXml);

    } catch (e) {
        logger.error('Sitemap Generator Error:', e);
        res.status(500).end();
    }
});

export default router;
