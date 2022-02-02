const keys = require('../keys');

module.exports = function (to) {
    return {
        to: to,
        from: keys.EMAIL_FROM,
        subject: 'Account was created',
        html: `
            <h1>Hi</h1>
            <p>The account with an email ${to}</p>
            <a href="${keys.BASE_URL}">Course store</a>
        `,
    }
}