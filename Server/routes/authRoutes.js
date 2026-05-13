//gestiscono le routes del frontend 
//gestiscono le richieste del frontend e chiamano i metodi del modello per interagire con il database per l'autenticazione

//Funzionalità di login e di signup 
const express = require("express"); 
const router = express.Router();
const authController = require("../controllers/authControllers")

//route per il login
router.post("/login", authController.login);

//route per il signup
router.post("/signup", authController.signup);

module.exports = router;