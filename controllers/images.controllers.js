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
    insert: async (req, res) => {
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { location, date, url, id_user, title, address } = req.body
            await Images.create({ id_user, location, date, url, title, address });
            const imgList= await Images.find({id_user}).sort({date:'desc'})
            const coords = imgList.map(image=>image.location)
            console.log(coords)
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
    addComment: async (req, res) => {
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { _id, id_user, user_name, text } = req.body
            console.log(req.body)
            const date = new Date(Date.now());
            const dateString = date.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
            const comment = { id_user, user_name, date: dateString, text }
            console.log(comment)
            const image = await Images.updateOne({ _id }, { $push: { coments: comment } })
            res.json(image)
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }
    },
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
    deleteImage:async(req,res)=>{
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { _id } = req.params
            const image = await Images.findOne({ _id })
            console.log(image)
            const {id_user, url} = image
            fs.unlinkSync(`${__dirname}/../images/${id_user}/${url}`)
            await Images.deleteOne({_id})
            const imgList= await Images.find({id_user}).sort({date:'desc'})
            const coords = imgList.map(image=>image.location)
            console.log(coords)
            let distance = 0;
            for (let i = 0; i < coords.length - 1; i++) {
              distance += getDistanceBetweenPoints(coords[i],coords[i+1]);
            }
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
