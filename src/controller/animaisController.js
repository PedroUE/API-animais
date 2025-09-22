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

const deleteAnimal = (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({
            success: false,
            message:`O animal com o id: ${id} não existe!`
        });
    }

    const animalParaRemover = animais.find(a => a.id === id);

    if(!animalParaRemover) {
        return res.status(404).json({
            seccess: false,
            message: `O animal com o id: ${id} não existe!`
        });
    }

    const animalFilter = animais.find(a => a.id !== id);

    animais.splice(0, animais.length, ...animalFilter);

    res.status(200).json ({
        sucess: true,
        message: `O animal de id: ${id} foi removido com sucesso! `
    });
}

const updateAnimais = (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, especie, raca, idade, peso, propietário, vacinado} = req.body
    const idParaEditar = id;

    if (isNaN(idParaEditar)) {
        return res.status(400).json({
            sucess: false,
            message: `O ID deve ser válido`
        });
    }

    const animalExistente = animais.find(animal => animal.id === idParaEditar);

    if(!animalExistente) {
        return res.status(404).json({
            sucess: false,
            message: `Nenhum animal com o id: ${id} não foi encontrado`
        });
    }

    const animaisAtualizados = animais.map(animal => animal.id === idParaEditar ? {
        ...animal,
        ...(nome && {nome}),
        ...(especie && {especie}),
        ...(raca && {raca}),
        ...(idade && {idade}),
        ...(peso && {peso}),
        ...(propietário && {propietário}),
        ...(vacinado && {vacinado})

    }
        :animais
    );

    animais.splice(0, animais.length, ...animaisAtualizados);
    const animalEditado = animais.find(animal => animal.id === idParaEditar);
    res.status(200).json({
        success: true,
        message: "Os dados foram atualizados com sucesso",
        animal: animalEditado
    });
}


export {getAllAnimais, getAnimaisById, createAnimal, deleteAnimal, updateAnimais};