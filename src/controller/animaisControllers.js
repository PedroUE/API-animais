import dados from "../models/dados.js";

const { animais } = dados;
let resultado = animais;


const getAllAnimais = (req, res) => {
    res.status(200).json ({
        total: resultado.length,
        animais: resultado
    });
}




export {getAllAnimais};