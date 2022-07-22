# final_backend_walterchavez

En primer lugar la aplicación de servidor debe tener sus capas MVC bien definidas y en archivos separados. Debe existir la capa de ruteo, el controlador, la capa de lógica de negocio con los casos de uso y las validaciones y la capa de persistencia con los DAOs/DTOs o Repositories necesarios para soportar el o los sistemas de persistencia elegidos. En caso de ser más de uno, utilizar una factory para que podamos elegir el sistema de almacenamiento al inicio del servidor.

El servidor debe disponer de configuraciones mediante variables de entorno, que permitan crear un ambiente para desarrollo y otro para producción, elegibles desde la variable de environment NODE_ENV al desplegar la aplicación. Como variables de configuración deberían estar el puerto de escucha del servidor, la persistencia elegida, el string de conexión a la base de datos (si hubiera varios sistemas de persistencia en base de datos considerar todos los casos y sus diferencias), API keys y todo lo que sea necesario que esté en un archivo protegido fuera del código del servidor. Pensar en utilizar bases de datos y servidores locales para la configuración de desarrollo.

Se debe analizar que el hecho de incorporar un caso más de uso en la lógica del servidor, sea un proceso de agregar código y no de modificar el existente.
Si agregamos un sistema más de persistencia, deberíamos agregar sólo el módulo nuevo y reformar la factory, mientras que resto del proyecto: router, controlador, lógica de negocio, validaciones y otros sistemas de persistencia no deberían sufrir modificaciones para soportar la nueva función.
El código debe quedar bien tabulado, legible, ordenado y comentado ni por exceso ni por defecto.
Las funciones o clases que se por sí solas expliquen su misión, no necesitan ser explicadas (salvo que amerite por complejidad).
Para concluir, subir el desarrollo completo a Heroku o algún PASS de preferencia, seleccionando la configuración a producción de modo de utilizar los parámetros adecuados de funcionamiento y la persistencia en la nube a través de bases de datos como servicio (DBaaS).

Piezas sugeridas
Node.js
MongoDB
Passport JWT
Mongoose
Bcrypt
Websocket
Dotenv
Handlebars, Pug, Ejs
Nodemailer

Inicio: Al momento de requerir la ruta base ‘/’
Permitir un menú de ingreso al sistema con email y password así como también la posibilidad de registro de un nuevo usuario.
El menú de registro consta del nombre completo del cliente, número telefónico, email y campo de password duplicado para verificar coincidencia.
Si un usuario se loguea exitosamente o está en sesión activa, la ruta ‘/’ hará una re dirección a la ruta del carrito /productos 
La ruta /productos devolverá el listado de todos los productos disponibles para la compra.
La ruta /productos/:categoria devolverá los productos por la categoría requerida.
Los ítems podrán ser agregados al carrito de compras y listados a través de la ruta /carrito.
Se podrán modificar y borrar por su id a través de la ruta /carrito:id.

Flow: Se puede solicitar un producto específico con la ruta /productos/:id, donde id es el id del item generado por MongoDB y devolver la descripción del producto ( foto, precio, selector de cantidad). 
Si se ingresa a /productos/:id y el producto no existe en MongoDB, debemos responder un mensaje adecuado que indique algo relacionado a que el producto no existe.

MongoDB:

Implementar al menos estas colecciones:
usuarios: clientes registrados
productos: catálogo completo
Link para foto (puede almacenarse de modo estático en la página en una subruta /images/:productoid )
Precio unitario
Descripción
Categoría

mensajes: chat del usuario (preguntas y respuestas)
Email: del usuario que pregunta o al que se responde
Tipo (‘usuario’ para preguntas ó ‘sistema’ para respuestas)
Fecha y hora
Cuerpo del mensaje

carrito: orden temporal de compra
Email
Fecha y hora
Items con sus cantidades
Dirección de entrega

ordenes: las órdenes generadas, que deben incluir los productos, descripciones y los precios al momento de la compra. 
Ítems:  las órdenes deben poder tener productos surtidos, cada uno con su cantidad. Por ejemplo: remeras x 2 y gorra x 1
Número de orden: Se extrae de la cantidad de órdenes almacenadas
Fecha y hora
estado ( por defecto en ‘generada’)
Email de quién realizó la orden

Finalizada la orden, enviar un mail a la dirección de mi cuenta con los detalles de la orden.
Se dispondrá de un archivo de configuración externo con opciones para desarrollo y otras para producción, que serán visualizadas a través de una vista construida con handlebars. Como parámetros de configuración estará el puerto de escucha del servidor, la url de la base de datos, el mail que recibirá notificaciones del backend, tiempo de expiración de sesión y los que sea necesario incluir.
Vamos a contar con un canal de chat general donde el usuario enviará los mensajes en la ruta /chat y en /chat/:email podrá ver sólo los suyos. Se utilizará la colección mensajes en MongoDB.  La tecnología de comunicación a utilizar será Websockets. El servidor implementará una vista, utilizando handlebars, para visualizar todos los mensajes y poder responder individualmente a ellos, eligiendo el email de respuesta.


