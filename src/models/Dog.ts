import mongoose, { Schema, Document } from 'mongoose';

interface IDog extends Document {
    name: string;
    age: number;
    gender: 'male' | 'female';
    breed: string;
    size: 'small' | 'medium' | 'big';
    vaccine: boolean;
    charity: mongoose.Types.ObjectId;
    photos: string[];
}

const DogSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    breed: { type: String, required: true },
    size: { type: String, enum: ['small', 'medium', 'big'], required: true },
    vaccine: { type: Boolean, required: true },
    charity: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photos: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IDog>('Dog', DogSchema);
