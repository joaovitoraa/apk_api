import mongoose from 'mongoose';

const posteSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    image: { type: String },
    data: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const blog = mongoose.model('poste', posteSchema);

export default blog;
