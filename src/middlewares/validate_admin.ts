import { NextFunction, Request, Response } from 'express';
import { config } from "dotenv";
config();
import getConnection from '../database/connection';
/**
 * Translate Import
 */
import texts from '../translate/texts';

/**
 * MIDDLEWARE
 * 
 * User Administrator Validation
 */
const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user && req.user.user_id) {
            let connection;
            let userID = req.user.user_id;
            getConnection()
                .then((conn) => {
                    connection = conn;
                    const sql_role = `
                        SELECT 
                            user.fk_role
                        FROM
                            user
                        WHERE user.id_user = ?;
                    `;
                    return connection.query(sql_role, userID);
                })
                .then((result) => {
                    /**
                     * Is the user role administrator or developer?
                     */
                    if (result[0].fk_role == process.env.US_ADMIN_ROLE || result[0].fk_role == process.env.US_DEVELOPER_ROLE) {
                        next();
                    } else {
                        res.status(401).json({
                            error: true,
                            error_message: texts.validate_admin.is_not_admin
                        })
                    }
                })
        } else {
            throw new Error(texts.validate_admin.not_user_info_error);
        }
    } catch (error) {
        res.status(401).json({
            error: true,
            error_message: error
        })
    }
}

export default validateAdmin;