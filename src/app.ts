import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import env from './config/environment';
import logger from './shared/utils/logger';
import { errorHandler } from './shared/middlewares/error.middleware';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting - exclude API docs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  skip: (req) => req.path.startsWith('/api-docs'), // Skip rate limiting for API docs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

logger.debug(`Application running in ${env.NODE_ENV} environment.`);
logger.info('Logger test message from app.ts');

app.use('/api/v1', routes);

// Serve Swagger UI with better configuration
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Enxero Platform API Documentation',
  customfavIcon: '/favicon.ico',
}));

// Add a simple redirect from root to API docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use(errorHandler);

export default app;