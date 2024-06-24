const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(morgan("dev"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).send({});
    }
    next(); // Chama next para passar para o próximo middleware
});

const rotaUsuarios = require("./routes/rotaUsuario");
const rotaComentario = require("./routes/rotaComentario");
const rotaReacao = require("./routes/rotaReacao");
const rotaFoto = require("./routes/rotaFoto");

app.use("/reacao", rotaReacao);
app.use("/comentario", rotaComentario);
app.use("/foto", rotaFoto);
app.use("/usuario", rotaUsuarios);

// Middleware para lidar com rotas não encontradas (404)
app.use((req, res, next) => {
    const erro = new Error("Não encontrado!");
    erro.status = 404;
    next(erro); // Chama next com o erro para passar para o próximo middleware de erro
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;
