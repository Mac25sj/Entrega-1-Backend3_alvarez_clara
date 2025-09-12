import { fakerES_MX as fa } from "@faker-js/faker"
import { createHash } from "../utils/index.js";

export const generaPet = () => {
    let name = fa.animal.petName();
    let specie = fa.animal.type();
    let birthDate = fa.date.birthdate({ mode: 'age', min: 1, max: 99 })
    let adopted = fa.datatype.boolean();
    let image = fa.image.avatar();

    let pet = {
        name,
        specie,
        birthDate,
        adopted,
        image
    };

    if (adopted) {
        pet.owner = fa.person.fullName();
    }

    return {
        pet
    }
}


export const generaUser = async () => {
    let first_name = fa.person.firstName();
    let last_name = fa.person.lastName();
    let email = fa.internet.email(
        {
            firstName: first_name,
            lastName: last_name, 
            provider: "gmail.com"
        })
    let password = await createHash('coder123')//Solicitado 
    let role = fa.helpers.arrayElement(['user', 'admin']);
    let pets = []

    return {
        first_name,
        last_name,
        email,
        password,
        role,
        pets
    }
}