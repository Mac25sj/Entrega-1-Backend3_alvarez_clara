import { Router } from 'express';
import { generaPet, generaUser } from '../mocks/mocks.js';
import userModel from '../dao/models/User.js';
import petModel from '../dao/models/Pet.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
    const pet = generaPet();
    return res.status(200).json(pet);
});

// Para usuarios simulados
router.get('/mockingusers', async (req, res) => {
    let { cantidad } = req.query;
    cantidad = parseInt(cantidad) || 1;

    if (cantidad <= 0) {
        return res.status(400).json({ error: "La cantidad debe ser mayor a cero" });
    }

    const usuarios = [];
    for (let i = 0; i < cantidad; i++) {
        usuarios.push(await generaUser()); 
    }

    return res.status(200).json({ usuarios });
});

// Endpoint POST /generateData 
router.post('/generateData', async (req, res) => {
    try {
        let { users, pets } = req.query;

        const cantidadUsers = parseInt(users) || 1;
        const cantidadPets = parseInt(pets) || 1;

        if (cantidadUsers < 0 || cantidadPets < 0) {
            return res.status(400).json({ error: "Los valores deben ser mayores o iguales a cero" });
        }

        // Generar usuarios
        const usuarios = [];
        for (let i = 0; i < cantidadUsers; i++) {
            usuarios.push(await generaUser());
        }

        const usersInsertados = await userModel.insertMany(usuarios);

        // Generar mascotas
        const mascotas = [];
        for (let i = 0; i < cantidadPets; i++) {
            const petData = generaPet().pet;

            if (petData.adopted) {
                const randomUser = usersInsertados[Math.floor(Math.random() * usersInsertados.length)];
                petData.owner = randomUser._id;
            }

            mascotas.push(petData);
        }

        const petsInsertados = await petModel.insertMany(mascotas);

        return res.status(201).json({
            message: 'Datos generados exitosamente!',
            users: usersInsertados,
            pets: petsInsertados
        });

    } catch (error) {
        console.error("Error generando datos:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;