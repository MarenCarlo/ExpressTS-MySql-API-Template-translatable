import { Request, Response } from 'express';
import getConnection from '../database/connection';
import bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import jwt, { Secret } from 'jsonwebtoken';
import { config } from "dotenv";
config();
/**
 * Shared Functions
 */
import { secondsToMidnight } from '../shared/secondsToMidnight';
/**
 * Translate Import
 */
import texts from '../translate/texts';

/**
 * Validation of Data Inputs entered by Users
 */
const schemaLogin = Joi.object({
    nameUser: Joi.string().min(4).max(32).required().messages({
        'string.base': texts.auth_controller.joi.nameUser.string_base,
        'string.min': texts.auth_controller.joi.nameUser.string_min,
        'string.max': texts.auth_controller.joi.nameUser.string_max,
        'any.required': texts.auth_controller.joi.nameUser.required,
    }),
    passUser: Joi.string().min(8).max(32).required().messages({
        'string.base': texts.auth_controller.joi.passUser.string_base,
        'string.min': texts.auth_controller.joi.passUser.string_min,
        'string.max': texts.auth_controller.joi.passUser.string_max,
        'any.required': texts.auth_controller.joi.passUser.required,
    }),
});
/**
 * Validation of Data Inputs entered by Users
 */
const schemaGetSessionToken = Joi.object({
    userID: Joi.number().integer().min(1).required().messages({
        'number.base': 'El Número de ID De Usuario debe ser de tipo Number',
        'number.integer': 'El Número de ID de Usuario Debe Ser de tipo Number - Integer',
        'number.min': 'El Número de ID de Usuario no puede ser menor a 0',
        'any.required': 'No Se Recibió Ningun Número de ID de Usuario',
    }),
});

/**
 * Principal Controller
 */
class auth_Controller {
    /**
     * Endpoint logIn
     * 
     * Works to return user session tokens
     */
    public logIn(req: Request, res: Response) {
        getConnection()
            .then((connection) => {
                const ip = req.socket.remoteAddress;
                console.log(ip);

                const { error } = schemaLogin.validate(req.body);
                if (error) {
                    res.status(400).json({
                        error: true,
                        error_message: error.details[0].message
                    });
                    throw new Error(texts.auth_controller.wrong_form_data_error);
                }

                const sql1 = `
                    SELECT
                        user.id_user,
                        user.codeUser,
                        user.userName,
                        user_state.id_state,
                        user_state.stateName,
                        user_role.id_role,
                        user_role.roleName
                    FROM
                        user
                    INNER JOIN user_state ON user.fk_state = user_state.id_state
                    INNER JOIN user_role ON user.fk_role = user_role.id_role
                    WHERE user.userName = ?
                `;
                return connection.query(sql1, [req.body.nameUser]);
            })
            .then((query_result) => {
                if (query_result[0] !== undefined) {
                    if (query_result[0].id_state == process.env.US_ACTIVE_STATE) {
                        const sql2 = `
                            SELECT
                                user.passUser
                            FROM
                                user
                            WHERE user.userName = ?
                        `;
                        return Promise.all([query_result, getConnection().then(conn => conn.query(sql2, query_result[0].userName))]);
                    } else {
                        res.status(401).json({
                            error: true,
                            error_message: texts.auth_controller.inactive_user
                        });
                        return Promise.reject(texts.auth_controller.inactive_user_error);
                    }
                } else {
                    res.status(404).json({
                        error: true,
                        error_message: `${texts.auth_controller.nonexistent_user} ${req.body.nameUser}`
                    });
                    return Promise.reject(texts.auth_controller.nonexistent_user_error);
                }
            })
            .then(([query_result, result2]) => {
                const validPassword = bcrypt.compareSync(req.body.passUser, result2[0].passUser);

                if (!validPassword) {
                    res.status(401).json({
                        error: true,
                        error_message: texts.auth_controller.wrong_password
                    });
                    return Promise.reject(texts.auth_controller.wrong_password_error);
                } else {
                    if (!process.env.TOKEN_SECRET) {
                        console.error(texts.auth_controller.secret_not_defined);
                        throw new Error(texts.auth_controller.secret_not_defined_error);
                    } else {
                        const currentTime = new Date();
                        const expiration_Time = secondsToMidnight(currentTime);
                        const token = jwt.sign({
                            user_id: query_result[0].id_user,
                            user_code: query_result[0].codeUser,
                            user_name: query_result[0].userName,
                            user_state: query_result[0].stateName,
                            user_role: query_result[0].roleName
                        }, process.env.TOKEN_SECRET as Secret, {
                            expiresIn: expiration_Time
                        });
                        console.log(texts.auth_controller.clg_successfully_logged_in)
                        res.status(200).header('auth-token', token).json({
                            error: false,
                            token_temporal: false,
                            message: texts.auth_controller.successfully_logged_in,
                            token,
                            query_result
                        });
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    /**
     * Endpoint logIn
     * Sirve para realizar todas las validaciónes necesarias para Iniciar Sesión.
     */
    public get_temporal_token(req: Request, res: Response) {
        getConnection()
            .then((connection) => {
                const ip = req.socket.remoteAddress;
                console.log(ip);

                const { error } = schemaGetSessionToken.validate(req.body);
                if (error) {
                    res.status(400).json({
                        error: true,
                        error_message: error.details[0].message
                    });
                    throw new Error(texts.auth_controller.wrong_form_data_error);
                }

                const sql1 = `
                    SELECT
                        user.id_user,
                        user.codeUser,
                        user.userName,
                        user_state.id_state,
                        user_state.stateName,
                        user_role.id_role,
                        user_role.roleName
                    FROM
                        user
                    INNER JOIN user_state ON user.fk_state = user_state.id_state
                    INNER JOIN user_role ON user.fk_role = user_role.id_role
                    WHERE user.id_user = ?
                `;
                return connection.query(sql1, [req.body.userID]);
            })
            .then((query_result) => {
                if (query_result[0] !== undefined) {
                    if (query_result[0].id_state == process.env.US_ACTIVE_STATE) {
                        if (!process.env.TOKEN_SECRET) {
                            console.error(texts.auth_controller.secret_not_defined);
                            throw new Error(texts.auth_controller.secret_not_defined_error);
                        } else {
                            const token = jwt.sign({
                                user_id: query_result[0].id_user,
                                user_code: query_result[0].codeUser,
                                user_name: query_result[0].userName,
                                user_state: query_result[0].stateName,
                                user_role: query_result[0].roleName
                            }, process.env.TOKEN_SECRET as Secret, {
                                expiresIn: process.env.JWT_TOKEN_TEMPORAL_EXPIRATION_TIME
                            });
                            console.log(texts.auth_controller.clg_successfully_logged_in)
                            res.status(200).header('auth-temporal-token', token).json({
                                error: false,
                                token_temporal: true,
                                message: 'Token Temporal Generado Correctamente',
                                token,
                                query_result
                            });
                        }
                    } else {
                        res.status(401).json({
                            error: true,
                            error_message: texts.auth_controller.inactive_user
                        });
                        return Promise.reject(texts.auth_controller.inactive_user_error);
                    }
                } else {
                    res.status(404).json({
                        error: true,
                        error_message: `No Existe ningún usuario con ID: ${req.body.userID}`
                    });
                    return Promise.reject(texts.auth_controller.nonexistent_user_error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const authController = new auth_Controller();
