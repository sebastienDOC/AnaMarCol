// Erreurs pendant le log in
module.exports.signUpErrors = (err) => {
    let errors = { pseudo :'', email:'', password : ''}

    if (err.message.includes('pseudo')) 
        errors.pseudo = "Pseudo incorrect ou déjà pris"
    if (err.message.includes('email')) 
        errors.email = "Email incorrect"
    if (err.message.includes('password')) 
        errors.password = "Le mot de passe doit faire 6 caractères minimum"
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "Ce pseudo est déjà pris"
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Cet email est déjà enregistré"

    return errors
}

// Erreur pendant la connexion
module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' } 

    if (err.message.includes('email'))
        errors.email = "Email inconnu"
    if (err.message.includes('password'))
        errors.password= "Le mot de passe ne correspond pas"

    return errors
}

const { extname } = require('path');

// Fonction pour gérer les erreurs lors de l'upload d'image
module.exports.uploadErrors = (err, detectedMimeType, fileName) => {
    let errors = { format: '', maxSize: '' };

    if (err.message.includes('Invalid file')) {
        const detectedMimeMessage = detectedMimeType ? `Detected MIME type: ${detectedMimeType}.` : '';
        const fileExtensionMessage = fileName ? `File extension: ${extname(fileName)}.` : '';
        errors.format = `Format incompatible. ${detectedMimeMessage} ${fileExtensionMessage}`;
    }

    if (err.message.includes('Max size')) {
        errors.maxSize = 'Le fichier est trop volumineux, maximum 500ko';
    }

    // Ajoutez ces lignes pour afficher les informations de débogage
    console.error('Detected MIME Type:', detectedMimeType);
    console.error('File Name:', fileName);

    return errors;
};