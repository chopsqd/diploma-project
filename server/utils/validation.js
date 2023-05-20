module.exports.validateLoginInput = (username, password) => {
    const errors = {}

    if(username.trim() === '') {
        errors.username = 'Поле username должно быть заполнено!'
    }

    if(password.trim() === '') {
        errors.password = 'Поле password должно быть заполнено!'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}