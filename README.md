![Project Preview](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxoF-12UQ55BcGVU0UwItzoZbu667nnNdcJA&s)

# Ejercicio técnico frontend - Minder

## Instalación 

Para comenzar, sigue estos pasos para clonar el repositorio y ejecutar el proyecto en modo desarrollo:

1. Clonar este repositorio:

  - git clone https://github.com/Leon2192/frontend-exercise

2. Accede al directorio del proyecto:

  - cd frontend-exercise

3. Instala las dependencias:

  - npm install

4. Para iniciar la API REST (json-server) ejecutar:
  - npm run db

5. Para iniciar la aplicacion ejecutar:
  - npm run dev

## Variables de entorno

#### Debemos crear el archivo `.env` en el directorio raíz del proyecto y agregar la siguiente variable de entorno:

| Key                | Value               | Descripción                      |
|--------------------|---------------------|----------------------------------|
| `VITE_API_BASE_URL` | `http://localhost:3000` | La URL base de la API para el entorno de desarrollo. |

Se puede simplemente copiar desde aca:

```javascript
VITE_API_BASE_URL=http://localhost:3000
```

### Ejemplo de uso

Se puede acceder a la variable de entorno en tu proyecto de la siguiente manera:

```javascript
const apiDomain = import.meta.env.VITE_API_BASE_URL;
```
## Tecnologias

* React, Context, MUI, Typescript


## Sobre este Proyecto

Este proyecto gestiona el estado global mediante **Context** y organiza las responsabilidades de las solicitudes HTTP en el directorio `/services`, mientras que las operaciones de manipulacion de datos se encuentran en `/actions`. 

Incluye (envuelto en comentarios) la funcionalidad para realizar operaciones de eliminación, que permanece comentada debido a que no es requerida en esta etapa. No obstante, puede descomentarse para habilitar su funcionamiento.
