import mysql from "mysql2";

const conectarDB = async () => {
    try {
        // Crea la conexión con los datos de tu base de datos
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,   
            user: process.env.MYSQL_USER,   
            password: process.env.MYSQL_PASSWORD, 
            database: process.env.MYSQL_DATABASE,  
            port: process.env.MYSQL_PORT || 3306,
        });

        console.log(`MySQL conectado en: ${connection.config.host}:${connection.config.port}`);
        return connection; // Devuelve la conexión para usarla en otras partes del código
    } catch (error) {
        console.error(`Error al conectar con MySQL: ${error.message}`);
        process.exit(1); // Finaliza el proceso en caso de error crítico
    }
};

export default conectarDB;
