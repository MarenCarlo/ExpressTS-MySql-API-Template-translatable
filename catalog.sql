-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-05-2023 a las 04:34:45
-- Versión del servidor: 8.0.29
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `catalog`
--

CREATE SCHEMA  `catalog`;
USE `catalog`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brand`
--

CREATE TABLE `brand` (
  `id_Brand` int NOT NULL,
  `brand_Name` varchar(64) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `brand`
--

INSERT INTO `brand` (`id_Brand`, `brand_Name`) VALUES
(1, 'Shein'),
(2, 'Adidas'),
(3, 'Levis'),
(5, 'Nike'),
(10, 'Hermes'),
(11, 'Dior');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_Category` int NOT NULL,
  `category_Name` varchar(64) NOT NULL
) ENGINE=InnoDB ;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_Category`, `category_Name`) VALUES
(1, 'Vestido'),
(2, 'Calzado'),
(3, 'Pantalon'),
(26, 'Accesorio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id_Product` int NOT NULL,
  `name_product` varchar(64) NOT NULL,
  `venta_descripcion` varchar(512) DEFAULT NULL,
  `Price` decimal(5,2) NOT NULL,
  `url_image` varchar(256) NOT NULL,
  `added_date` timestamp NOT NULL,
  `fk_Category` int NOT NULL,
  `fk_Brand` int NOT NULL
) ENGINE=InnoDB  ;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id_Product`, `name_product`, `venta_descripcion`, `Price`, `url_image`, `added_date`, `fk_Category`, `fk_Brand`) VALUES
(1, 'Vestido Para Dama', NULL, '350.00', '/src/assets/img/1.png', '2023-01-09 06:38:43', 1, 1),
(2, 'Zapatos Deportivos Blancos', NULL, '550.00', '/src/assets/img/2.webp', '2023-01-14 06:38:43', 2, 2),
(3, 'Jeans Levis', NULL, '450.00', '/src/assets/img/3.webp', '2023-01-24 06:38:43', 3, 3),
(4, 'Pantalon de Levis', NULL, '400.00', '/src/assets/img/3.webp', '2023-01-26 06:38:43', 3, 3),
(5, 'Zapatos Adidas', NULL, '500.00', '/src/assets/img/2.webp', '2023-02-02 06:51:20', 2, 2),
(6, 'Vestido Azul', NULL, '350.00', '/src/assets/img/1.png', '2023-02-05 23:32:24', 1, 1),
(7, 'Zapatos Deportivos Para Dama', NULL, '870.00', '/src/assets/img/2.webp', '2023-02-06 00:13:18', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_User` int NOT NULL,
  `codeUser` varchar(12) NOT NULL,
  `userName` varchar(32) NOT NULL,
  `passUser` varchar(512) NOT NULL,
  `fk_State` int NOT NULL,
  `fk_Role` int NOT NULL,
  `fk_Organization` int NOT NULL,
  `masterKey` tinyint NOT NULL,
  `developer` tinyint(1) NOT NULL,
  `added_date` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
) ENGINE=InnoDB  ;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_User`, `codeUser`, `userName`, `passUser`, `fk_State`, `fk_Role`, `fk_Organization`, `masterKey`, `developer`, `added_date`, `updated_at`) VALUES
(1, 'ADM-00000001', 'Admin', '$2b$12$JI67TampN/PYA/SHBhIRtukHspXvPxQd4JZIftd2um5CGUG/UmHU6', 1, 1, 1, 1, 0, '2022-10-20 10:14:50', '2022-10-20 10:14:50'),
(2, 'DEV-00000001', 'Maren', '$2b$12$JI67TampN/PYA/SHBhIRtukHspXvPxQd4JZIftd2um5CGUG/UmHU6', 1, 2, 1, 1, 1, '2022-10-20 10:14:50', '2022-10-20 10:14:50'),
(3, 'USE-00000001', 'User1', '$2b$12$JI67TampN/PYA/SHBhIRtukHspXvPxQd4JZIftd2um5CGUG/UmHU6', 1, 3, 1, 0, 0, '2022-10-20 10:14:50', '2022-10-20 10:14:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_role`
--

CREATE TABLE `user_role` (
  `id_Role` int NOT NULL,
  `roleName` varchar(64)  NOT NULL,
  `roleDescription` varchar(256)  NOT NULL
) ENGINE=InnoDB  ;

--
-- Volcado de datos para la tabla `user_role`
--

INSERT INTO `user_role` (`id_Role`, `roleName`, `roleDescription`) VALUES
(1, 'Administrador', 'Este Rol de Usuario otorga el permiso para las funciones Avanzadas de la API.'),
(2, 'Desarrollador', 'Este rol otorga permisos para funciones que solo puede realizar un desarrollador.'),
(3, 'Usuario De Sistema', 'Este rol otorga permisos para las funciones básicas de la API.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_state`
--

CREATE TABLE `user_state` (
  `id_State` int NOT NULL,
  `stateName` varchar(32)  NOT NULL,
  `stateDescription` varchar(256)  NOT NULL
) ENGINE=InnoDB  ;

--
-- Volcado de datos para la tabla `user_state`
--

INSERT INTO `user_state` (`id_State`, `stateName`, `stateDescription`) VALUES
(1, 'Activo', 'Un Usuario con este Estado puede ingresar y hacer uso de la API.'),
(2, 'Inactivo', 'Un Usuario con este Estado NO puede ingresar y hacer uso de la API.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id_Brand`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_Category`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_Product`),
  ADD KEY `fk_product_tb_category` (`fk_Category`),
  ADD KEY `fk_product_tb_brand` (`fk_Brand`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_User`),
  ADD UNIQUE KEY `id_User_UNIQUE` (`id_User`),
  ADD UNIQUE KEY `code_User_UNIQUE` (`codeUser`),
  ADD UNIQUE KEY `userName_UNIQUE` (`userName`),
  ADD KEY `fk_State` (`fk_State`),
  ADD KEY `fk_Role` (`fk_Role`),
  ADD KEY `User_to_Organization` (`fk_Organization`);

--
-- Indices de la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id_Role`),
  ADD UNIQUE KEY `id_Role_UNIQUE` (`id_Role`),
  ADD UNIQUE KEY `role_Name_UNIQUE` (`roleName`),
  ADD UNIQUE KEY `role_Description_UNIQUE` (`roleDescription`);

--
-- Indices de la tabla `user_state`
--
ALTER TABLE `user_state`
  ADD PRIMARY KEY (`id_State`),
  ADD UNIQUE KEY `id_State_UNIQUE` (`id_State`),
  ADD UNIQUE KEY `state_Name_UNIQUE` (`stateName`),
  ADD UNIQUE KEY `state_Description_UNIQUE` (`stateDescription`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brand`
--
ALTER TABLE `brand`
  MODIFY `id_Brand` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_Category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id_Product` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_User` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id_Role` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_state`
--
ALTER TABLE `user_state`
  MODIFY `id_State` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_tb_brand` FOREIGN KEY (`fk_Brand`) REFERENCES `brand` (`id_Brand`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_product_tb_category` FOREIGN KEY (`fk_Category`) REFERENCES `category` (`id_Category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_to_roles` FOREIGN KEY (`fk_Role`) REFERENCES `user_role` (`id_Role`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `User_to_states` FOREIGN KEY (`fk_State`) REFERENCES `user_state` (`id_State`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;
