const res = require('express/lib/response')
const pets = require('../controllers/pets')
const conexao = require('../infraestrutura/conexao')
const uploadArquivo = require('../arquivos/uploadArquivos')

class Pet {

    adiciona(pet, res) {
        uploadArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {

            if (erro) {
                res.status(400).json({ erro })
            } else {
                const novoPet = {nome: pet.nome, imagem: pet.imagem}
                const sql = 'INSERT INTO Pets SET ? '
        
                conexao.query(sql, novoPet, erro => {
                    if(erro) {
                        res.status(400).json(erro)
                    } else {
                        res.status(201).json(pet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet()
