import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';

interface DBUser {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  nationality: string;
}

interface RegisterRequest extends Request {
  body: {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    nationality: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const app = express();
const db = new Database('users.db');

// Crear tabla de usuarios si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    age INTEGER NOT NULL,
    nationality TEXT NOT NULL
  )
`);

app.use(cors());
app.use(express.json());

// Registro
app.post('/api/register', async (req: RegisterRequest, res: Response) => {
  const { id, name, email, password, age, nationality } = req.body;
  
  try {
    // Verificar si el correo ya existe
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as DBUser | undefined;
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
    db.prepare(`
      INSERT INTO users (id, name, email, password, age, nationality)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, name, email, hashedPassword, age, nationality);

    // Devolver usuario sin la contraseña
    const user = { id, name, email, age, nationality };
    res.json({ user });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Login
app.post('/api/login', async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;
  
  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as DBUser | undefined;
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Devolver usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});