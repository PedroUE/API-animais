import dados from "../models/dados.js";

const { animais } = dados;
let resultado = animais;


const getAllAnimais = (req, res) => {
    res.status(200).json ({
        total: resultado.length,
        animais: resultado
    });
}

const getAnimaisById = (req, res) => {
    const id = parseInt(req.params.id);

    const animal = animais.find(a => a.id === id);

    if (!animal) {
        res.status(404).json({
            success: false,
            message: `O animal não existe! `
        });
    }

    res.status(200).json({
        total: animal.length,
        animal: animal
    });
}

const createAnimal = (req, res) => {
    const {nome, especie, raca, idade, peso, propietário, vacinado} = req.body;
    
    if(!nome || !especie || !raca || !idade || !peso) {
        return res.status(400).json({
            success: false,
            message: "Nome, especie, raca, idade e peso são obrigatórios para criar um animal!"
        });
    }

    const novoAnimal = {
        id: animais.length + 1,
        nome,
        especie,
        raca,
        idade,
        peso,
        propietário,
        vacinado
    }

    animais.push(novoAnimal);

    res.status(201).json({
        sucess: true,
        message: "animal criado com sucesso!",
        animal: novoAnimal
    });
}


export {getAllAnimais, getAnimaisById, createAnimal};