const fs = require('fs')
const path = require('path')

module.exports =  (caminho, nomeArquivo, callbackImgCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if(tipoEhValido) {
        const novoCaminho = `./assets/imagens/${nomeArquivo}${tipo}`
        
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImgCriada(false, novoCaminho))
    } else {
        const erro = 'Tipo inválido'
        callbackImgCriada(erro)
    }

}
