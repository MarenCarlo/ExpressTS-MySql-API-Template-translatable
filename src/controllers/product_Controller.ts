import { Request, Response } from 'express';
import getConnection from '../database/connection';

class ProductController {

    /**
     * Función que Obtiene el Listado de los productos.
     */
    public getProductsList(req: Request, res: Response) {
        let connection;
        getConnection()
            .then((conn) => {
                connection = conn;
                var ip = req.socket.remoteAddress;
                console.info(ip);
                const sql = `
                    SELECT
                        product.id_Product,
                        product.name_product,
                        product.url_image,
                        product.price,
                        category.id_Category,
                        category.category_Name,
                        brand.id_Brand,
                        brand.brand_Name
                    FROM
                        product
                    INNER JOIN category ON product.fk_Category = category.id_Category
                    INNER JOIN brand ON product.fk_Brand = brand.id_Brand
                    ORDER BY
                        added_date
                    DESC;
                `;
                return connection.query(sql);
            })
            .then((result) => {
                console.log('Listado de Productos Obtenidos');
                res.status(200).json({
                    error: false,
                    data: result,
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({
                    error: true,
                    error_message: 'Error al obtener los productos',
                });
            })
    }
}

export const productController = new ProductController();