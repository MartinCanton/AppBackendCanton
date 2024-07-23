# Proyecto de Backend

# Características del Proyecto
- **Productos:** Se pueden realizar opreaciones de CRUD con productos.
- **Carrito:** Se pueden crear carritos, agregar productos al carro y listar los productos de un carrito en particular.
- **Endpoints** Se obtienen resultados mediante Postman. GET, POST, PUT Y DELETE:
 - Las rutas de los mismos son:
    - `GET /api/products`: Lista todos los productos.
    - `GET /api/products/:pid`: Obtiene un producto por su ID.
    - `POST /api/products`: Crea un nuevo producto.
    - `PUT /api/products/:pid`: Actualiza un producto existente.
    - `DELETE /api/products/:pid`: Elimina un producto por su ID.
    - `POST /api/carts`: Crea un nuevo carrito.
    - `GET /api/carts/:cid`: Obtiene los productos de un carrito por su ID.
    - `POST /api/carts/:cid/product/:pid`: Agrega un producto al carrito especificado.
    - `DELETE /api/carts/:cid`: Elimina un carrito por su ID.

