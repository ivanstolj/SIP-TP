# CyberGuard

## Descripción

CyberGuard es una plataforma web que proporciona diversas funcionalidades relacionadas con la seguridad informática. Los usuarios pueden reportar incidentes de seguridad, acceder a recursos educativos, realizar pruebas de conocimiento y suscribirse a planes premium para obtener beneficios adicionales.

## Instalación
En primera instancia se requiere clonar el repositorio.

```bash
git clone https://github.com/ivanstolj/SIP-TP.git
```

### Dependencias
Para la instalación de dependencias ejecutaremos el siguiente comando.
```
npm install
```
## Inicialización
Para iniciar el proyecto ejecutamos.
```
npm run start
```

De esta forma, veremos nuestra página activa el siguiente [link](http://localhost:3000/)

## Funcionalidades
Los usuarios podrán realizar las siguientes funciones:

* Registrarse.
* Iniciar Sesión.
* Cambiar su contraseña.
* Visualizar su perfil.
* Visualizar denuncias de la comunidad.
* Denunciar mails, teléfonos o URLs.
* Aprobar reportes.
* Desaprobar reportes.
* Filtrar reportes según sus preferencias.
* Leer consejos acerca de la seguridad informática.
* Generar contraseñas seguras.
* Realizar un test de conocimiento basado en su nivel.

## Consideraciones
- Solo los usuarios validados podrán iniciar sesión.
- No se podrá aprobar o desaprobar denuncias si no se inicia sesión.
- No se podrá aprobar o desaprobar denuncias propias.
- El avatar del perfil es aleatorio y se establece por el nombre de usuario, sin posibilidad de cambio.