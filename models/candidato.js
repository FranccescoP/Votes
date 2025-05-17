import mongoose from 'mongoose';

const candidatoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    Partido: { type: String, required: true },
    votos: { type: Number, default: 0 }
});

const Candidato = mongoose.model('Candidato', candidatoSchema);
export default Candidato;