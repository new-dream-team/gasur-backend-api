import { Schema, model } from 'mongoose';

const ImageSchema = new Schema({
    name: String,
    urlImage: String
});

export default model('Image' , ImageSchema);
