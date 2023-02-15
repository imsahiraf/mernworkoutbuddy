require('dotenv').config();

module.exports = () => {
    const transportor = process.env.mailservice+'transport'
    // if (typeof new eval(transportor) === "object") {
    //     console.log('Yes Confirm')
    // }
    return eval(transportor).transport()
}   

class gmailtransport {
    static transport () { // Calling it statically so we dont have to create an instance
        return {
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: 'testmailerjulf@gmail.com',
                pass: 'hbkvnxzcojndvayo'
            }
        }
    }
}

class mailtraptransport {
    static transport () {
        return {
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b6f01b7d916642",
                pass: "b637db19d2f47c"
            }
        }
    }
}
