const Images = require("../models/mongodb/img.models")
const mongoose = require("mongoose");
const url = `mongodb://127.0.0.1:27017/pww`;

const image = {
    insert: async (req, res) => {
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { location, date, url, id_user, title, address } = req.body
            console.log(req.body)
            await Images.create({ id_user, location, date, url , title, address})
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
            console.log(req.params)
            res.json(await Images.find({ id_user }))
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }
    },
    addComment: async (req,res)=>{
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
            const comment = {id_user, user_name, date:dateString, text}
            console.log(comment)
            const image = await Images.updateOne({_id},{$push:{coments: comment}})
            res.json(image)
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }
    },
    deleteComment: async (req,res)=>{
        await mongoose.connect(url).catch(error => handleError(error));
        try {
            const { _id, _id_coment } = req.body
            const image = await Images.updateOne({_id},{$pull:{coments: {_id:mongoose.Types.ObjectId(_id_coment)}}})
            res.json(image)
        } catch (error) {
            res.json(error)
        } finally {
            await mongoose.connection.close();
        }
    },

}

module.exports = image
