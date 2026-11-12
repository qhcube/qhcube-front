# Juego del Hipercubo Cuántico

Interfaz web de **QHCube**, el juego del Hipercubo Cuántico. Se puede jugar en <https://qhcube.etsisi.upm.es>.

El hipercubo cuántico representa una puerta cuántica discreta de dos cúbits, es decir, una matriz 4x4 cuyas entradas son números complejos de la forma `a+bi` con _a_ y _b_ enteros.

El objetivo del juego es conseguir, mediante una serie de movimientos, que el hipercubo represente la matriz identidad.

El juego lo creó Jesús García López de Lacalle (UPM). Iván García Alcaide (UPM) desarrolló la gestión de jugadores y partidas. El proyecto se divide en tres repositorios:

- **qhcube-front** (este): la interfaz web.
- [qhcube-back](https://github.com/qhcube/qhcube-back): la API REST (Spring Boot + MySQL).
- [qhcube-deploy](https://github.com/qhcube/qhcube-deploy): el despliegue en producción con Docker Compose y Caddy.

## Tecnologías

- Vue 3, con Vite para el desarrollo y la compilación.
- PrimeVue 3, PrimeFlex y PrimeIcons para los componentes y el diseño.
- Pinia para el estado (jugador y vista) y Vue Router para la navegación.
- Axios para las llamadas a la API.
- El motor del juego (el dibujo del hipercubo en un `canvas` y sus movimientos) está en JavaScript dentro de `src/index.html`.

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/index.html` | Página principal y motor del juego |
| `src/main.js`, `src/App.vue` | Arranque de la aplicación Vue y configuración de axios |
| `src/components` | Componentes: juego, partidas, jugadores (login, registro, perfil), información del juego, errores |
| `src/assets/js` | Llamadas a la API (`authUtils.js`, `gameUtils.js`), estado con Pinia y rutas |
| `src/assets/images`, `src/assets/css` | Imágenes y estilos |
| `src/.env.development`, `src/.env.production` | URLs de la API en desarrollo y en producción |

## Arrancar en local

Requisitos: Node 22 y el backend ([qhcube-back](https://github.com/qhcube/qhcube-back)) en marcha en el puerto 9000.

```bash
npm ci
npm run dev
```

La aplicación queda en <http://localhost:8080>. Las URLs de la API se leen de `src/.env.development`.

## Versiones y releases

- Cada cambio se hace en una rama propia, con un PR a `dev`. Una versión nueva se publica con un PR de `dev` a `main`.
- La CI (`.github/workflows/ci.yml`) compila el proyecto en cada PR y en cada push a `dev` y `main`.
- Al subir un tag `vX.Y.Z`, el workflow `.github/workflows/publicar.yml` comprueba que coincide con la versión de `package.json`, compila y crea un borrador de release con `qhcube-front-X.Y.Z.tar.gz` y `SHA256SUMS`.
- El despliegue en producción se describe en [qhcube-deploy](https://github.com/qhcube/qhcube-deploy).

Para compilar a mano:

```bash
npm run build
```

El resultado queda en `dist/`, con las URLs de `src/.env.production`.

## Licencia

Copyright (C) 2023-2026 Jesús García López de Lacalle, Universidad Politécnica de Madrid, Iván García Alcaide.

Este programa es software libre: puede redistribuirse y/o modificarse según los términos de la Licencia Pública General de GNU (GPL) publicada por la Free Software Foundation, ya sea la versión 3 de la licencia o, a elección del usuario, cualquier versión posterior.

Se distribuye con la esperanza de que sea útil, pero SIN NINGUNA GARANTÍA, ni siquiera la garantía implícita de COMERCIABILIDAD o IDONEIDAD PARA UN PROPÓSITO PARTICULAR. Consulte el fichero [LICENSE](LICENSE) para más detalles.
