import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllPets = async (req, res) => {
  try {
    const pets = await petsService.getAll();
    res.status(200).json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

const createPet = async (req, res) => {
  try {
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate) {
      return res.status(400).json({ status: "error", error: "Incomplete values" });
    }

    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);
    res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

const updatePet = async (req, res) => {
  try {
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId, petUpdateBody);
    res.status(200).json({ status: "success", message: "Pet updated", payload: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

const deletePet = async (req, res) => {
  try {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.status(200).json({ status: "success", message: "Pet deleted", payload: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

const createPetWithImage = async (req, res) => {
  try {
    const file = req.file;
    const { name, specie, birthDate } = req.body;

    if (!name || !specie || !birthDate || !file) {
      return res.status(400).json({ status: "error", error: "Incomplete values or missing image" });
    }

    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`,
    });

    const result = await petsService.create(pet);
    res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message || error });
  }
};

export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
};