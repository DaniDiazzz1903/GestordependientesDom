# Rick & Morty — Elenco Principal

Aplicación Angular que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/)
para mostrar un catálogo curado de personajes (Rick, Morty, la familia Smith y algunos
secundarios recurrentes), pedidos directamente por ID al endpoint `/character/[ids]`.

## Funcionalidad principal

- Cada personaje se muestra en una tarjeta con imagen, estado, especie y última ubicación.
- Botón **"Enviar al portal"** que marca al personaje como eliminado: la imagen pasa a
  escala de grises y aparece una **✕** superpuesta. El botón cambia a "Revivir" para
  poder deshacer la marca.
- El estado de "eliminados" se guarda en `localStorage`, así que persiste si recargás la página.
- Contador de eliminados en el encabezado.

## Cómo correrlo

```bash
npm install
npm start
```

Luego abrir `http://localhost:4200`.

## Estructura relevante

- `src/app/services/character.service.ts` — trae el elenco fijo por ID.
- `src/app/components/character-list/` — componente de catálogo (lógica + template + estilos).
- `src/app/models/character.model.ts` — tipado de la respuesta de la API.
