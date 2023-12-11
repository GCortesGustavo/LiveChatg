

# Chat en tiempo real

Realizado con NodeJs, Socket.io, HTML, CSS y SQL

## INFORMACION TEÓRICA DE UTILIDAD

### Diferencia entre HTTP Y WEB SOCKET

HTTP: Es un protocolo que es stateless, es decir que NO tiene estados. Esto permite que sea cachable, es decir que siempre la Request siempre va a devolver la misma imagen. Se puede usar para recursos html, js, img, REST API. No es event driven, es decir que no esta basado en eventos.


Web Socket: Es un protocolo que es Stateful, Es decir que SI tiene estados. Para que no sea cachable, osea que el mensajepor ejempo no sea siempre el mismo. Se pueden utilizar para Real time, info ida y venida, poca latencia. Es event driven, osea que esta basado en eventos. Se prodcie una conexión persistente.


Los dos protocolos son de comunicación que se basa en intercambio de mensajes entre clientes y un servidos. Los dos usan TCP como protocolo de transporte.

## Primeros pasos

Instalo dependencias para el funcionamiento de la app. Comenzamos con "npm init -y" para iniciar un package.json.
Instalamos express y morgan para escuchar el servidor. Creamos el servidor para que se escuche en el puerto 3000

## HTML

Creamos el documento HTML con estilos para poder visualizar el chat en tiempo real


### Socket.io
Uso socket.io para poder crear el web socket que utilizaré para el mensaje

### En resumen

Pude crear un chat en tiempo real el cual a través de la información que comparte el usuario en un imput, es comunicado con el servidor y con otro usuario.

Las pruebas se realizaron con una API que genera usarios randoms para probrar el funcionamiento de la misma. 
Lo mas desafiante fue la conexión con la base de datos.
