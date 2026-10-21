# hipodromo

Sitio estático simple (Vite + TS). 3 páginas: main, carrera, bar.

## Descarga

```bash
git clone https://github.com/FrancoMarchetta/TPIngenieriaSoftware.git
cd TPIngenieriaSoftware
```

## Correr con Docker

```bash
docker build -t hipodromo .
docker run -d -p 8080:80 --name hipodromo hipodromo
```

--> http://localhost:8080

La imagen compila TypeScript y corre Vite internamente, luego sirve con nginx en el puerto 8080.

## Desarrollo local

Necesitas tener Node.js instalado

```bash
npm install
npm run dev
```
