import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [process.env.FRONTEND_URL, 'https://devtree-front.vercel.app'];

        if(process.argv.includes('--api')) {
            allowedOrigins.push(undefined);
        }
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};