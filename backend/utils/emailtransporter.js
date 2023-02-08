require('dotenv').config();

module.exports = () => {
    if(process.env.mailservice == 'gmail'){
        return gmailtransport()
    }else{
        return mailtraptransport()
    }
}

const gmailtransport = () => {
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

const mailtraptransport = () => {
    return {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "b6f01b7d916642",
            pass: "b637db19d2f47c"
        }
    }
}