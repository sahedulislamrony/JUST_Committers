import { Router, Request, Response, NextFunction } from 'express';
import timeout from 'connect-timeout';
import { handleAnalyzeTicket } from '@/api/v1/controllers/ticket.controller';
import { createApiError } from '@/middlewares/error.middleware';

const router = Router();

router.route('/analyze-ticket')
    .post(timeout('25s'), handleAnalyzeTicket)
    .all((req: Request, res: Response, next: NextFunction) => {
        if (req.method === 'OPTIONS' || req.method === 'HEAD') {
            return next();
        }
        res.setHeader('Allow', 'POST, OPTIONS, HEAD');
        next(createApiError(405, `Method ${req.method} not allowed on /analyze-ticket`));
    });

// Middleware right after the route definition to catch req.timedout
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (req.timedout) {
        return res.status(500).json({ error: "Service Busy: Request timed out." });
    }
    next(err);
});


export default router;
