import { fakerES_MX as fa } from "@faker-js/faker"
import { createHash } from "../utils/index.js"

export const generaPet = () => {
  const name = fa.animal.petName()
  const specie = fa.animal.type()
  const birthDate = fa.date.birthdate({ mode: 'age', min: 1, max: 99 })
  const adopted = fa.datatype.boolean()
  const image = fa.image.avatar()

  const pet = {
    _id: fa.database.mongodbObjectId(),
    name,
    specie,
    birthDate,
    adopted,
    image
  }

  if (adopted) {
    pet.owner = fa.person.fullName()
  }

  return { pet }
}

export const generaUser = async () => {
  const first_name = fa.person.firstName()
  const last_name = fa.person.lastName()
  const email = fa.internet.email({
    firstName: first_name,
    lastName: last_name,
    provider: "gmail.com"
  })
  const password = await createHash('coder123')
  const role = fa.helpers.arrayElement(['user', 'admin'])
  const pets = []

  return {
    _id: fa.database.mongodbObjectId(),
    first_name,
    last_name,
    email,
    password,
    role,
    pets
  }
}

export const generaPets = (count = 1) => {
  const results = []
  for (let i = 0; i < count; i++) {
    const { pet } = generaPet()
    results.push(pet)
  }
  return results
}

export const generaUsers = async (count = 1) => {
  const promises = Array.from({ length: count }, () => generaUser())
  return await Promise.all(promises)
}