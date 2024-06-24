const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;



// Rota para login de usuário
router.post("/", (req, res, next) => {
    const { email, senha } = req.body;

    mysql.getConnection((err, conn) => {
        if (err) {
            console.error('Erro ao conectar ao MySQL:', err);
            return res.status(500).send({ error: "Erro interno no servidor" });
        }

        const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
        conn.query(query, [email, senha], (err, results) => {
            conn.release();

            if (err) {
                console.error('Erro na consulta ao MySQL:', err);
                return res.status(500).send({ error: "Erro interno no servidor" });
            }

            if (results.length === 0) {
                return res.status(401).send({ mensagem: "Email ou senha incorretos" });
            }

            // Se encontrou um usuário com o email e senha corretos, pode fazer o login
            // Aqui você poderia gerar um token JWT, criar uma sessão, etc.
            res.status(200).send({ mensagem: "Login realizado com sucesso", usuario: results[0] });
        });
    });
});

module.exports = router;
