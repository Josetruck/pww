const Images = require("../models/mongodb/img.models")
const mongoose = require("mongoose");
const url = `mongodb://127.0.0.1:27017/pww`;
const user = require("./users.controllers");
const fs = require('fs')

/**
 * Funcion que calcula la distancia entre dos coordenadas
 * @param {Array} coords1 
 * @param {Array} coords2 
 * @returns {INTEGER} Distancia entre dos coordenadas en KM
 */
function getDistanceBetweenPoints(coords1, coords2) {
    const [latitude1, longitude1] = coords1
    const [ latitude2, longitude2] = coords2
    let theta = longitude1 - longitude2;
    let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        Math.sin(latitude1 * (Math.PI/180)) * Math.sin(latitude2 * (Math.PI/180)) + 
        Math.cos(latitude1 * (Math.PI/180)) * Math.cos(latitude2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
    );
        return Math.round(distance * 1.609344, 2);
}

const image = {
    /**
     * Inserta una imagen en la base de datos MongoDB.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    insert: async (req, res) => {
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { location, date, url, id_user, title, address } = req.body
            await Images.create({ id_user, location, date, url, title, address });
            const imgList= await Images.find({id_user}).sort({date:'desc'})
            const coords = imgList.map(image=>image.location)
            let distance = 0;
            for (let i = 0; i < coords.length - 1; i++) {
              distance += getDistanceBetweenPoints(coords[i],coords[i+1]);
            }
            await user.updateUserDistance(id_user, distance)
            res.json("ok")
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }

    },
    /**
     * Responde con un array con las imágenes que pertenecen a un usuario filtrando por la ID del usuario
     * @param {JSON} req 
     * @param {JSON} res 
     */
    getImagesById: async (req, res) => {
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { id_user } = req.params
            res.json(await Images.find({ id_user }))
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }
    },
    /**
     * Añade un comentario en el Array del campo "coments" en el documento que contiene una imagen filtrado por la id de la imagen.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    addComment: async (req, res) => {
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { _id, id_user, user_name, text } = req.body
            
            // Obtenemos la fecha en la que se crea el comentario y la formateamos.
            const date = new Date(Date.now());
            const dateString = date.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            // construimos el objeto que se va a insertar en el array del campo "coments"
            const comment = { id_user, user_name, date: dateString, text }
            // Actualizamos el documento haciendo un push en el campo "coments"
            const image = await Images.updateOne({ _id }, { $push: { coments: comment } })
            res.json(image)
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }
    },

    /**
     * Borra un comentario en concreto de una imagen filtrada por su id, con el método $pull filtrando por el object id del comentario.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    deleteComment: async (req, res) => {
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { _id, _id_coment } = req.body
            const image = await Images.updateOne({ _id }, { $pull: { coments: { _id: mongoose.Types.ObjectId(_id_coment) } } })
            res.json(image)
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }
    },

    /**
     * Elimina una imagen de la colección filtrando por la id y ademas la elimina de la carpeta del almacenamiento.
     * @param {JSON} req 
     * @param {JSON} res 
     */
    deleteImage:async(req,res)=>{
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { _id } = req.params
            // Buscamos la imagen para averiguar la id del usuario y el nombre del archivo y borrarlo del almacenamiento.
            const image = await Images.findOne({ _id })
            const {id_user, url} = image
            //Borra la imagen del almacenamiento
            fs.unlinkSync(`${__dirname}/../images/${id_user}/${url}`)
            //Borra la imagen de la colección.
            await Images.deleteOne({_id})
            //Actualiza la distancia recorrida por el usuario entre las imágenes.
            const imgList= await Images.find({id_user}).sort({date:'desc'})
            const coords = imgList.map(image=>image.location)
            let distance = 0;
            for (let i = 0; i < coords.length - 1; i++) {
              distance += getDistanceBetweenPoints(coords[i],coords[i+1]);
            }
            //Actualiza la distancia recorrida en la base de datos del usuario.
            await user.updateUserDistance(id_user, distance)
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false)
        } finally {
            await mongoose.connection.close();
        }
    }

}

module.exports = image
