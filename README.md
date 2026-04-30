# ⚡ PokeNext Pokedex

![PokeNext Banner](./public/pokedex_banner.png)

Una aplicación moderna, rápida y visualmente impactante para explorar el mundo Pokémon. Construida con las últimas tecnologías web para ofrecer una experiencia de usuario premium con estética futurista y efectos de glassmorphism.

## 🚀 Características

- **Exploración Dinámica**: Listado completo de Pokémon consumiendo la [PokéAPI](https://pokeapi.co/).
- **SSR (Server Side Rendering)**: Carga ultrarrápida gracias al renderizado en el servidor de Next.js.
- **Diseño Premium**: Interfaz moderna con fondos desenfocados (glassmorphism), tipografía elegante y micro-animaciones.
- **Totalmente Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio.
- **Detalles Técnicos**: Información detallada de cada Pokémon, incluyendo tipos, estadísticas y habilidades.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **API**: [PokéAPI](https://pokeapi.co/)

## 📦 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/pokemon-API.git
   cd pokemon-API/poke-next
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   o
      ```bash
   npm start
   ```

5. **Ver el resultado**:
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

```text
poke-next/
├── app/                # Rutas y páginas de la aplicación
├── components/         # Componentes de UI reutilizables
├── lib/                # Utilidades y funciones de fetching de API
├── public/             # Archivos estáticos e imágenes
└── styles/             # Configuraciones globales de CSS
```

## 📝 Notas del Desarrollador

> "Esta home consume la PokéAPI desde el servidor y muestra pokemones para que te culturices desgraciao (20 profe bella muak)."

---

Desarrollado con ❤️ por el equipo de Lenguajes de Programacion Brian, Leo (no hizo nada xd) y Samuel (menos xd).


# YO SI TRABAJE PROFE NO LE HAGA CASO A BRIAN 

SAMUEL EFECTIVAMENTE NO HA HECHO NADA XD

PD: Soy Brian, efectivamente al final si trabajaron xd (Samuel tambien, increiblemente).
---

## Interfaz y casos de uso para mi profe bella

### 1. Interfaz del home y filtros
![home1](./public/home1.png)

### 2. Interfaz de cómo se listan pokemones y paginación
![home2](./public/home2.png)

### 3. Uso de filtros desde home
![filtro-agua](./public/filtro-agua.png)

### 4. Uso de la barra de búsqueda por ID de Pokedex
![busqueda-id](./public/busqueda-id.png)

### 5. Uso de la barra de búsqueda por nombre del pokemon
![busqueda-nombre](./public/busqueda-nombre.png)

### 6. Interfaz del detalle del pokemon
![detalle-pokemon](./public/detalle-pokemon.png)
