const { checkSchema } = require('express-validator');

module.exports = {
    signup: checkSchema({
        name: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'Nome precisa de pelo menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email Invalido'
        },
        password: {
            isLength: {
                options: {min: 4}
            },
            errorMessage: 'Senha Invalida precisa de pelo manos que 4 caracteres'
        },
        states: {
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    })
};