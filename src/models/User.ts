import mongoose from 'mongoose';

interface IUser {
    username: string;
    email: string;
    passwordHash: string;
    type: 'charity' | 'adopt';
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    type: { type: String, enum: ['charity', 'adopt'], required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
