
# Backend de Infografías - Proyecto de Evaluación

Este repositorio contiene el backend para la gestión de infografías y un microservicio SOAP que se conecta a la API para obtener estadísticas sobre las infografías.

## Estructura del Proyecto

El proyecto consta de dos partes principales:

1. **API de Backend de Infografías:**  
   - Conecta a una base de datos MongoDB.
   - Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las infografías.

2. **Microservicio SOAP:**  
   - Expone un servicio SOAP para consultar estadísticas relacionadas con las infografías.

## ¿Cómo Descargar el Backend?

Para descargar y ejecutar el backend de este proyecto, sigue estos pasos:

### 1. Clonar el Repositorio

Abre una terminal en tu máquina y ejecuta el siguiente comando:

```bash
git clone https://github.com/pardovich/backend-infografias.git
```

### 2. Instalación de Dependencias

Una vez que hayas clonado el repositorio, navega hasta la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
cd backend-infografias
npm install
```

### 3. Configuración de MongoDB

Este proyecto requiere una base de datos MongoDB. Asegúrate de tener MongoDB en ejecución y configurado en tu entorno.

En el archivo `server.js`, la conexión a MongoDB está configurada en:

```javascript
mongoose.connect('mongodb://localhost:27017/infografias', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB - API de Infografías'))
.catch((err) => console.error('Error conectando a MongoDB:', err));
```

Si deseas usar MongoDB en la nube (como MongoDB Atlas), deberás actualizar la URL de conexión en este archivo con tu propia cadena de conexión.

### 4. Ejecutar el Servidor

Una vez que las dependencias estén instaladas y la base de datos esté configurada, puedes iniciar el servidor con:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`.

### 5. Acceder al Servicio SOAP

El microservicio SOAP está disponible en `http://localhost:3002/wsdl`.

Puedes probar las solicitudes SOAP usando herramientas como **Postman** o **SoapUI**. El servicio devolverá estadísticas relacionadas con las infografías, como el total de infografías, el promedio de longitud y otros datos.

## Endpoints Disponibles

1. **GET /infografias**  
   Obtiene todas las infografías almacenadas en la base de datos.

2. **POST /infografias**  
   Crea una nueva infografía en la base de datos.

3. **GET /infografias/:id**  
   Obtiene una infografía específica por ID.

4. **PUT /infografias/:id**  
   Actualiza una infografía por ID.

5. **DELETE /infografias/:id**  
   Elimina una infografía por ID.

## Documentación del Microservicio SOAP

El microservicio SOAP proporciona estadísticas sobre las infografías a través de un servicio WSDL. Para obtener las estadísticas, realiza una solicitud SOAP a `http://localhost:3002/wsdl`.

El servicio devuelve un XML con estadísticas sobre las infografías, como:

- Total de infografías.
- Longitud promedio de las infografías.
  
### Ejemplo de Solicitud SOAP

```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/InfografiaService">
  <SOAP-ENV:Header/>
  <SOAP-ENV:Body>
    <tns:getInfografiaStatsRequest/>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

### Ejemplo de Respuesta SOAP

```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/InfografiaService">
  <SOAP-ENV:Body>
    <tns:getInfografiaStatsResponse>
      <total>1</total>
      <avgLength>48.00</avgLength>
    </tns:getInfografiaStatsResponse>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Conclusión

Este proyecto permite gestionar infografías y consultar estadísticas relacionadas con ellas mediante una API REST y un microservicio SOAP. Para cualquier consulta o modificación, puedes revisar el código fuente en este repositorio.

### Retos Encontrados:
- Uno de los principales desafíos fue integrar correctamente la API de backend con el servicio SOAP, ya que ambos sistemas utilizan protocolos de comunicación diferentes (REST y SOAP). Sin embargo, esto se resolvió al usar **Axios** para realizar solicitudes HTTP desde el servicio SOAP.

### Futuras Mejoras:
- **Ampliación de Endpoints**: Podemos agregar más funcionalidades al servicio SOAP para incluir más métricas relacionadas con las infografías.
- **Mejoras de Seguridad**: Implementar seguridad adicional para proteger las solicitudes SOAP.

---

**Notas Finales:**
- Asegúrate de agregar las capturas de las pruebas, la respuesta de Postman y otros elementos visuales que complementen el informe.
