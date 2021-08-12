import fs from 'fs'

const getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/public/assets`))
  } catch (error) {
    console.log(error)
  }
}

export default getManifest

