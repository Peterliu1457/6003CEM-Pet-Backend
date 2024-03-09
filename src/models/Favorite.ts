import mongoose, { Schema, Document } from 'mongoose';

interface IFavorite extends Document {
    dog: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
}

const FavoriteSchema: Schema = new Schema({
    dog: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
