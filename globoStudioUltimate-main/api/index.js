import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectarDB from "./config/db.js";
import usuarioRoute from './routes/usuarioRoutes.js';
import categoryRoutes from "./routes/categoryRoute.js";
import cityRoutes from "./routes/cityRoutes.js";
import colorRoutes from './routes/colorRoutes.js';
import sizeRoutes from './routes/sizeRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import pointsRoutes from "./routes/pointsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectarDB();

/* const whitelist = [process.env.FRONTEND_URL];
const blacklist = [];

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Error de cors"));
        }
    }
}

app.use(cors(corsOptions));
 */
//Routing

app.use('/api/usuarios', usuarioRoute);
app.use("/api/categories", categoryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/points', pointsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/order_items', orderItemRoutes);


const PORT = process.env.PORT || 4000;

const servidor = app.listen(4000, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
});
