# hipodromo

Sitio estático simple (Vite + TS). 3 páginas: main, carrera, bar.

## Correr con Docker

```bash
docker build -t hipodromo .
docker run -p 80:80 hipodromo
```

La imagen compila TypeScript y corre Vite internamente, luego sirve con nginx en el puerto 80.

## Desarrollo local

Necesitas tener Node.js instalado

```bash
npm install
npm run dev
```
