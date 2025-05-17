// app.js
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Candidato from './models/candidato.js';
import Voto from './models/voto.js';
import Votante from './models/votantes.js';
import Ganador from './models/ganador.js';

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const { MONGO_URI, PORT } = process.env;

app.use(express.json()); // Para poder trabajar con JSON en las peticiones

// NUEVO: Para manejar rutas absolutas correctamente
const __filename = fileURLToPath(import.meta.url); // NUEVO
const __dirname = path.dirname(__filename);        // NUEVO

// NUEVO: Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend'))); // NUEVO

// Conectar a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('Error al conectar a MongoDB', err));

// Rutas

// Crear un candidato
app.post('/candidatos', async (req, res) => {
    const { nombre,  Partido } = req.body;

    const candidato = new Candidato({ nombre, Partido });

    try {
        const savedCandidato = await candidato.save();
        res.status(201).json(savedCandidato);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el candidato', error });
    }
});

// Obtener todos los candidatos
app.get('/candidatos', async (req, res) => {
    try {
        const candidatos = await Candidato.find();
        res.status(200).json(candidatos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los candidatos', error });
    }
});

//eliminar

app.delete('/candidatos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCandidato = await Candidato.findByIdAndDelete(id);

        if (!deletedCandidato) {
            return res.status(404).json({ message: 'Candidato no encontrado' });
        }

        res.status(200).json({ message: 'Candidato eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el candidato', error });
    }
});
// listar votantes
app.get('/votantes', async (req, res) => {
    try {
        const votantes = await Votante.find();
        res.status(200).json(votantes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los Votantes', error });
    }
});
// Registrar un votante
app.post('/votantes', async (req, res) => {
    const { nombre, email , dni} = req.body;

    const votante = new Votante({ nombre, email , dni });

    try {
        const savedVotante = await votante.save();
        res.status(201).json(savedVotante);
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar el votante', error });
    }
});


//eliminar

app.delete('/votantes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVotantes = await Votante.findByIdAndDelete(req.params.id);

        if (!deletedVotantes) {
            return res.status(404).json({ message: 'Candidato no encontrado' });
        }

        res.status(200).json({ message: 'Votante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar ', error });
    }
});


// Registrar un voto
app.post('/votar', async (req, res) => {
    const { dni, PartidoCandidato } = req.body;
     try {
    const votante = await Votante.findOne({ dni });
    if (!votante) return res.status(404).json({ message: 'Votante no encontrado' });

    const candidato = await Candidato.findOne({ Partido: PartidoCandidato });
    if (!candidato) return res.status(404).json({ message: 'Candidato no encontrado' });

    const votoExistente = await Voto.findOne({ votanteId: votante._id });
    if (votoExistente) {
      return res.status(400).json({ message: 'El votante ya ha votado' });
    }

    const voto = new Voto({ votanteId: votante._id, candidatoId: candidato._id });
    await voto.save();

    await Candidato.findByIdAndUpdate(candidato._id, { $inc: { votos: 1 } });

    res.status(201).json({ message: 'Voto registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar el voto', error });
  }
});

// Obtener al ganador (candidato con más votos)
app.get('/ganador', async (req, res) => {
    try {
        const ganador = await Candidato.findOne().sort({ votos: -1 });
        if (!ganador) {
            return res.status(404).json({ message: 'No hay votos registrados' });
        }

        res.status(200).json(ganador);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el ganador', error });
    }
});

// NUEVO: Capturar cualquier ruta no reconocida y servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Iniciar servidor
const port = PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
