import { Request, Response } from 'express';
import getConnection from '../database/connection';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import { config } from "dotenv";
config();
/**
 * Translate Import
 */
import texts from '../translate/texts';

/**
 * Validation of Data Inputs entered by Users
 */
const schemaSignUp = Joi.object({
    nameUser: Joi.string().min(4).max(32).required().messages({
        'string.base': texts.user_controller.joi.nameUser.string_base,
        'string.min': texts.user_controller.joi.nameUser.string_min,
        'string.max': texts.user_controller.joi.nameUser.string_max,
        'any.required': texts.user_controller.joi.nameUser.required,
    }),
    passUser: Joi.string().min(8).max(32).required().messages({
        'string.base': texts.user_controller.joi.passUser.string_base,
        'string.min': texts.user_controller.joi.passUser.string_min,
        'string.max': texts.user_controller.joi.passUser.string_max,
        'any.required': texts.user_controller.joi.passUser.required,
    }),
    roleUser: Joi.number().integer().min(1).max(99).required().messages({
        'number.base': texts.user_controller.joi.roleUser.number_base,
        'number.integer': texts.user_controller.joi.roleUser.number_integer,
        'number.min': texts.user_controller.joi.roleUser.number_min,
        'number.max': texts.user_controller.joi.roleUser.number_max,
        'any.required': texts.user_controller.joi.roleUser.required,
    }),
});

/**
 * user_controller
 * 
 * Controller of functions that have to do with actions that modify User data
 */
class user_Controller {
    /**
     * Endpoint signUp
     * Used to register new users in the APP.
     */
    public signUp(req: Request, res: Response) {
        getConnection()
            .then(async (connection) => {
                const ip = req.socket.remoteAddress;
                console.log(ip);

                const { error } = schemaSignUp.validate(req.body);
                if (error) {
                    res.status(400).json({
                        error: true,
                        error_message: error.details[0].message
                    });
                    throw new Error(texts.user_controller.wrong_form_data_error);
                }

                const sql = `
                    SELECT
                        user.userName
                    FROM
                        user
                    WHERE user.userName = ?
                `;
                return connection.query(sql, [req.body.nameUser]);
            })
            .then(async (query_result) => {
                if (query_result[0] === undefined) {
                    console.log(req.body)
                    let { nameUser, passUser, roleUser } = req.body;
                    const salt = await bcrypt.genSalt(12);
                    const cryptedPass = await bcrypt.hash(passUser, salt);
                    const sql = `
                        INSERT INTO user (codeUser, userName, passUser, fk_State, fk_Role, fk_organization, masterKey, developer, added_date, updated_at) 
                        VALUES ('USE-00000005', ?, ?, '2', ?, '0', '0', 0, NOW(), NOW());
                    `;
                    return Promise.all([getConnection().then(conn => conn.query(sql, [nameUser, cryptedPass, roleUser]))]);
                } else {
                    res.status(400).json({
                        error: true,
                        error_message: texts.user_controller.previously_registered_user
                    })
                    return Promise.reject(texts.user_controller.previously_registered_user_error);
                }
            })
            .then(() => {
                console.log(texts.user_controller.clg_new_user);
                res.status(201).json({
                    error: false,
                    message: texts.user_controller.new_registered_user,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const userController = new user_Controller();
