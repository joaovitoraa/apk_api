import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    usuario: { type: String },
    email: { type: String, required: [true, 'O e-mail é obrigatório.'] },
    senha: { type: String, required: [true, 'A senha é obrigatório.'] },
  },
  { versionKey: false },
);

const user = mongoose.model('usuarios', userSchema);

export { user, userSchema };
