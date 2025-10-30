import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessibleForm from "../components/AccessibleForm";
import { useAuth } from "../stores/auth";
import { useA11y } from "../a11y/accessibilityStore";

export default function Register() {
  const auth = useAuth();
  const a11y = useA11y();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validación de campos individuales
  // Funciones individuales de validación para reducir complejidad cognitiva
  const validateEmail = (value: string) => {
    if (!value) return "El correo es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Ingresa un correo electrónico válido";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "La contraseña es obligatoria";
    if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return "La contraseña debe contener mayúsculas, minúsculas y números";
    }
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    return value === password ? "" : "Las contraseñas no coinciden";
  };

  const validateAge = (value: string) => {
    if (!value) return "La edad es obligatoria";
    const ageNum = Number.parseInt(value, 10);
    if (Number.isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
      return "Ingresa una edad válida (18-120)";
    }
    return "";
  };

  const validateName = (value: string) => {
    if (!value) return "El nombre es obligatorio";
    if (value.length < 2) return "El nombre es demasiado corto";
    return "";
  };

  const validateNationality = (value: string) => {
    return value ? "" : "La nacionalidad es obligatoria";
  };

  const validateField = (field: string, value: string) => {
    let errorMessage = "";

    switch (field) {
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        break;
      case 'confirmPassword':
        errorMessage = validateConfirmPassword(value);
        break;
      case 'age':
        errorMessage = validateAge(value);
        break;
      case 'name':
        errorMessage = validateName(value);
        break;
      case 'nationality':
        errorMessage = validateNationality(value);
        break;
    }

    // Si hay error, lo guardamos en el estado
    if (errorMessage) {
      setErrors(prev => ({ ...prev, [field]: errorMessage }));
      return false;
    }
    
    // Si no hay error, eliminamos el error previo si existía
    setErrors(prev => {
      const newState = { ...prev };
      delete newState[field];
      return newState;
    });
    return true;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    
    // Limpiar errores previos
    setError("");
    setErrors({});
    
    // Validar todos los campos
    const isNameValid = validateField('name', name);
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);
    const isConfirmPasswordValid = validateField('confirmPassword', confirmPassword);
    const isAgeValid = validateField('age', age);
    const isNationalityValid = validateField('nationality', nationality);

    if (!isNameValid || !isEmailValid || !isPasswordValid || 
        !isConfirmPasswordValid || !isAgeValid || !isNationalityValid) {
      setError("Por favor, corrige los errores en el formulario");
      return;
    }

    try {
      const user = { 
        id: String(Date.now()), 
        name, 
        email,
        age: Number.parseInt(age, 10),
        nationality
      };

      const ok = await auth.register(user, password);
      if (ok) {
        navigate("/app");
      } else {
        setErrors(prev => ({ ...prev, email: "Este correo ya está registrado" }));
        setError("Ya existe un usuario con ese correo");
      }
    } catch (err) {
      setError("Error al registrar usuario. Por favor, intenta de nuevo.");
      console.error("Error en registro:", err);
    }
  }

  return (
    <AccessibleForm className="max-w-2xl mx-auto p-6 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Registro</h2>
      <p className="text-sm text-gray-600 mb-4">Complete el formulario para crear su cuenta. Todos los campos son obligatorios.</p>

      <form onSubmit={submit} aria-describedby="register-desc">
        <p id="register-desc" className="sr-only">Formulario de registro básico con campos personales.</p>

        <label className="block mb-4">
          <span className="text-sm font-medium">Nombre completo</span>
          <input 
            className={`mt-1 block w-full rounded border px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
            value={name}
            onChange={e => {
              setName(e.target.value);
              validateField('name', e.target.value);
            }}
            required
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium">Edad</span>
          <input 
            type="number"
            className={`mt-1 block w-full rounded border px-3 py-2 ${errors.age ? 'border-red-500' : ''}`}
            value={age}
            onChange={e => {
              setAge(e.target.value);
              validateField('age', e.target.value);
            }}
            required
          />
          {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium">Nacionalidad</span>
          <input 
            className={`mt-1 block w-full rounded border px-3 py-2 ${errors.nationality ? 'border-red-500' : ''}`}
            value={nationality}
            onChange={e => {
              setNationality(e.target.value);
              validateField('nationality', e.target.value);
            }}
            required
          />
          {errors.nationality && <span className="text-red-500 text-sm">{errors.nationality}</span>}
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium">Correo electrónico</span>
          <input 
            type="email"
            className={`mt-1 block w-full rounded border px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              validateField('email', e.target.value);
            }}
            required
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium">Contraseña</span>
          <input 
            type="password"
            className={`mt-1 block w-full rounded border px-3 py-2 ${errors.password ? 'border-red-500' : ''}`}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              validateField('password', e.target.value);
            }}
            required
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium">Confirmar contraseña</span>
          <input 
            type="password"
            className={`mt-1 block w-full rounded border px-3 py-2 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              validateField('confirmPassword', e.target.value);
            }}
            required
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
        </label>

        {error && <div role="alert" className="text-red-600 mb-4">{error}</div>}

        <div className="mt-4 flex gap-2">
          <button type="submit" className={`px-4 py-2 rounded bg-green-600 text-white ${a11y.largeTargets ? 'min-w-[140px] h-14' : ''}`}>Crear cuenta</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded border">Volver</button>
        </div>
      </form>
    </AccessibleForm>
  );
}
