module.exports = (email, text) => {
    return {
        from: 'verify@gmail.com',
        to: email,
        subject: 'This email is to verify your Workout Buddy Account',
        text: text
      };
}