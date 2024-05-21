const resetPasswordTemplate = (username, resetLink) => `
    <h1>Hola, ${username}</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer contraseña</a>
    <p>Si no solicitaste restablecer tu contraseña, ignora este mensaje.</p>
    <p>Gracias</p>
    <p>El equipo de TimeTracker</p>
`;

module.exports = {resetPasswordTemplate};