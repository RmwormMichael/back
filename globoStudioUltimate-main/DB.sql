USE GloboStudio;

CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    token VARCHAR(255),
    confirmed BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL, -- Nueva columna para la contraseña
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de actualización
    rol VARCHAR(50)
);


-- Tabla city
CREATE TABLE city (
    id_city INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabla points
CREATE TABLE points (
    id_user INT,
    number_points INT DEFAULT 0,
    PRIMARY KEY (id_user),
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE
);

-- Tabla size
CREATE TABLE size (
    id_size INT AUTO_INCREMENT PRIMARY KEY,
    size VARCHAR(50) NOT NULL
);

-- Tabla category
CREATE TABLE category (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabla color
CREATE TABLE color (
    id_color INT AUTO_INCREMENT PRIMARY KEY,
    color VARCHAR(50) NOT NULL
);

-- Tabla product
CREATE TABLE product (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de actualización
    size INT,
    color INT,
    id_category INT,
    FOREIGN KEY (size) REFERENCES size(id_size) ON DELETE CASCADE,
    FOREIGN KEY (color) REFERENCES color(id_color) ON DELETE CASCADE,
    FOREIGN KEY (id_category) REFERENCES category(id_category) ON DELETE CASCADE
);


CREATE TABLE orders (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    points INT,
    status VARCHAR(50),
    date_order DATE,
    direction VARCHAR(255),
    id_user INT,
    id_city INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Fecha de última actualización
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_city) REFERENCES city(id_city) ON DELETE CASCADE
);





-- Tabla order_item
CREATE TABLE order_item (
    id_order_item INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    id_order INT,
    id_product INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Fecha de última actualización
    FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES product(id_product) ON DELETE CASCADE
);







/*   **************************************CONTENIDO*****************************

-- Insertar los colores
INSERT INTO color (id_color, color) VALUES
(1, 'red'),
(2, 'black'),
(3, 'white'),
(4, 'green'),
(5, 'orange'),
(6, 'purple'),
(7, 'gold'),
(8, 'blue'),
(9, 'pink'),
(10, 'yellow');


-- Insertar los tamaños
INSERT INTO size (id_size, size) VALUES
(1, 'r-5'),
(2, 'r-7'),
(3, 'r-9'),
(4, 'r-12'),
(5, 'r-18'),
(6, 'r-24');


-- Insertar las categorias
INSERT INTO category (id_category, name) VALUES
(1, 'Latex'),
(2, 'Metalizados');



-- Insertar las ciudades
INSERT INTO city (id_city, name) VALUES
(1, 'Bogotá'),
(2, 'Medellin'),
(3, 'Cali'),
(4, 'Barranquilla'),
(5, 'Cartagena');


-- Insertar los datos de usuarios con las nuevas columnas
INSERT INTO user (id_user, name, email, token, confirmed, password, created_at, updated_at, rol) VALUES
(1, 'michael', 'michael@gmail.com', 'm123', TRUE, 'password_michael', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'admin'),
(2, 'juan', 'juan@gmail.com', 'j223', TRUE, 'password_juan', '2024-10-25 15:30:00', '2024-10-25 15:30:00', 'client'),
(3, 'oscar', 'oscar@gmail.com', 'o123', TRUE, 'password_oscar', '2024-10-25 16:30:00', '2024-10-25 16:30:00', 'client'),
(4, 'jhon', 'jhon@gmail.com', 'j323', TRUE, 'password_jhon', '2024-10-25 17:30:00', '2024-10-25 17:30:00', 'client'),
(5, 'jorge', 'jorge@gmail.com', 'j423', TRUE, 'password_jorge', '2024-10-25 18:30:00', '2024-10-25 18:30:00', 'client'),
(6, 'diego', 'diego@gmail.com', 'd123', TRUE, 'password_diego', '2024-10-25 19:30:00', '2024-10-25 19:30:00', 'client'),
(7, 'alejandro', 'alejandro@gmail.com', 'a223', TRUE, 'password_alejandro', '2024-10-25 20:30:00', '2024-10-25 20:30:00', 'client'),
(8, 'andres', 'andres@gmail.com', 'a123', FALSE, 'password_andres', '2024-10-25 21:30:00', '2024-10-25 21:30:00', 'client');



-- Insertar los puntos
INSERT INTO points (id_user, number_points) VALUES
(1, 50),
(2, 100),
(3, 150);

-- Insertar los productos con las nuevas columnas created_at y updated_at
INSERT INTO product (name, price, created_at, updated_at, size, color, id_category)
VALUES 
('link-o-loon', 3.500, '2024-10-25 14:30:00', '2024-10-25 14:30:00', 1, 2, 1),
('redondo', 3.000, '2024-10-25 14:30:00', '2024-10-25 14:30:00', 2, 4, 1),
('globo 1-60', 4.000, '2024-10-25 14:30:00', '2024-10-25 14:30:00', 4, 7, 1),
('globo 2-60', 4.500, '2024-10-25 14:30:00', '2024-10-25 14:30:00', 6, 6, 1),
('globo metalizado corazon', 5.000, '2024-10-25 14:30:00', '2024-10-25 14:30:00', 6, 9, 2),
('globo metalizado estrella', 5.500, '2024-10-25 14:30:00', '2024-10-25 14:30:00', 5, 8, 2),
('globo metalizado numero uno', 6.000, '2024-10-25 14:30:00', '2024-10-25 14:30:00', 4, 9, 2),
('globo metalizado cara feliz', 7.000, '2024-10-25 14:30:00', '2024-10-25 14:30:00', 1, 10, 2);


-- Insertar las órdenes 
INSERT INTO orders (points, status, date_order, created_at, updated_at, direction, id_user, id_city)
VALUES
(1, NULL, '2024-10-25', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'Avenida 19 No. 98-03', 1, 1),
(2, NULL, '2024-10-25', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'Calle 53 No 10-60/46', 2, 2),
(3, NULL, '2024-10-25', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'Calle 10 # 5-51', 3, 3),
(1, NULL, '2024-10-25', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'Avenida Calle 26 No 59-51', 4, 4),
(2, NULL, '2024-10-25', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'Calle 9 # 9 – 62', 5, 5),
(3, NULL, '2024-10-25', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'Calle 19 # 80A-40', 6, 1),
(1, NULL, '2024-10-25', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'Carrera 21 # 17 -63', 7, 2),
(2, NULL, '2024-10-25', '2024-10-25 14:30:00', '2024-10-25 14:30:00', 'Carrera 42 # 54-77', 8, 3);


-- HACE FALTA REFERENCIAR PUNTOS

-- Insertar los items de la orden
INSERT INTO order_item (quantity, price, id_order, id_product, created_at, updated_at) 
VALUES
(10, 35000, 3, 1, '2024-10-25 14:30:00', '2024-10-25 14:30:00'),
(20, 60000, 4, 1, '2024-10-25 14:30:00', '2024-10-25 14:30:00'),
(30, 120000, 3, 3, '2024-10-25 14:30:00', '2024-10-25 14:30:00'),
(40, 180000, 4, 4, '2024-10-25 14:30:00', '2024-10-25 14:30:00'),
(10, 50000, 5, 5, '2024-10-25 14:30:00', '2024-10-25 14:30:00'),
(20, 110000, 6, 6, '2024-10-25 14:30:00', '2024-10-25 14:30:00'),
(30, 180000, 7, 7, '2024-10-25 14:30:00', '2024-10-25 14:30:00'),
(40, 210000, 8, 8, '2024-10-25 14:30:00', '2024-10-25 14:30:00');

