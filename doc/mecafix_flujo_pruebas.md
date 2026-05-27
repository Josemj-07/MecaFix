# 🔧 MecaFix — Flujo Completo de Pruebas

> Escenario: Un cliente llega al taller con su Toyota Corolla que necesita un cambio de aceite y un filtro de aire nuevo. Se le crea una cotización, se aprueba, se genera la orden de servicio, el mecánico trabaja las tareas, y finalmente el cliente paga.

**Base URL:** `http://localhost:8080`

> [!IMPORTANT]
> Todos los endpoints (excepto login) requieren el header:
> ```
> Authorization: Bearer <TOKEN>
> Content-Type: application/json
> ```

---

## Paso 0 — Autenticación

**`POST /auth/login`**

```json
{
    "email": "admin@example.com",
    "password": "123"
}
```

📌 **Guardar:** el campo `token` de la respuesta. Usarlo en el header `Authorization: Bearer <TOKEN>` en todos los pasos siguientes.

---

## Paso 1 — Crear Cliente

**`POST /api/v1/customers`**

```json
{
    "firstName": "Carlos",
    "lastName": "Mendoza",
    "email": "carlos.mendoza@gmail.com",
    "mobilePhone": "0991234567",
    "nationalId": "1712345678"
}
```

📌 **Guardar:** `id` → lo llamaremos **`CUSTOMER_ID`**

---

## Paso 2 — Registrar Vehículo del Cliente

**`POST /api/v1/vehicles`**

```json
{
    "customerId": "<CUSTOMER_ID>",
    "plate": "ABC-1234",
    "brand": "Toyota",
    "model": "Corolla",
    "manufacturingYear": 2020,
    "mileage": 45000,
    "color": "Gris"
}
```

📌 **Guardar:** `id` → lo llamaremos **`VEHICLE_ID`**

---

## Paso 3 — Crear Mecánico

**`POST /api/v1/mechanics`**

```json
{
    "firstName": "Jorge",
    "lastName": "Ramírez",
    "email": "jorge.ramirez@mecafix.com",
    "mobilePhone": "0987654321",
    "nationalId": "1798765432",
    "specialty": "Motor"
}
```

📌 **Guardar:** `id` → lo llamaremos **`MECHANIC_ID`**

---

## Paso 4 — Crear Servicio (Mano de Obra)

**`POST /api/v1/services`**

```json
{
    "name": "Cambio de aceite y filtro",
    "description": "Cambio completo de aceite de motor sintético 5W-30 y reemplazo de filtro de aceite",
    "laborPrice": 25000
}
```

📌 **Guardar:** `id` → lo llamaremos **`SERVICE_ID`**

---

## Paso 5 — Crear Categoría de Producto

**`POST /api/v1/categories`**

```json
{
    "name": "Filtros"
}
```

📌 **Guardar:** `id` → lo llamaremos **`CATEGORY_ID`**

---

## Paso 6 — Crear Producto (Repuesto)

**`POST /api/v1/products`**

```json
{
    "name": "Filtro de aire Toyota Corolla",
    "description": "Filtro de aire original para Toyota Corolla 2018-2023",
    "purchasePrice": 8000,
    "salePrice": 15000,
    "stock": 10,
    "categoryId": "<CATEGORY_ID>"
}
```

📌 **Guardar:** `id` → lo llamaremos **`PRODUCT_ID`**

---

## Paso 7 — Crear Cotización

Creamos la cotización con los items (servicio + producto):

**`POST /api/v1/quotes`**

```json
{
    "customerId": "<CUSTOMER_ID>",
    "vehicleId": "<VEHICLE_ID>",
    "items": [
        {
            "type": "SERVICE",
            "itemId": "<SERVICE_ID>",
            "quantity": 1
        },
        {
            "type": "PRODUCT",
            "itemId": "<PRODUCT_ID>",
            "quantity": 1
        }
    ]
}
```

📌 **Guardar:** `id` → lo llamaremos **`QUOTE_ID`**

> [!NOTE]
> - `type` puede ser `"SERVICE"` o `"PRODUCT"`
> - `itemId` es el ID del servicio o producto según el tipo
> - El `totalAmount` se calcula automáticamente

---

## Paso 7.1 — (Opcional) Agregar más items a la cotización

Si se quiere agregar otro item después de crear la cotización:

**`POST /api/v1/quotes/<QUOTE_ID>/items`**

```json
{
    "type": "SERVICE",
    "itemId": "<OTRO_SERVICE_ID>",
    "quantity": 1
}
```

---

## Paso 7.2 — Consultar Cotización

**`GET /api/v1/quotes/<QUOTE_ID>`**

Sin body. Devuelve el detalle completo con todos los items y el total.

---

## Paso 8 — Aprobar Cotización

El cliente acepta la cotización:

**`PATCH /api/v1/quotes/<QUOTE_ID>/approve`**

Sin body. Cambia el estado de `PENDING` → `APPROVED`.

📌 La cotización debe estar en estado `PENDING` para poder aprobarla.

> [!TIP]
> Si el cliente rechaza, usar: **`PATCH /api/v1/quotes/<QUOTE_ID>/reject`**

---

## Paso 9 — Crear Orden de Servicio

Se crea la orden a partir de la cotización aprobada, asignando mecánicos a las tareas:

**`POST /api/v1/service-orders`**

```json
{
    "quoteId": "<QUOTE_ID>",
    "tasks": [
        {
            "mechanicId": "<MECHANIC_ID>",
            "serviceId": "<SERVICE_ID>"
        }
    ]
}
```

📌 **Guardar:**
- `id` → lo llamaremos **`SERVICE_ORDER_ID`**
- Consultar la orden para obtener los IDs de las tasks

> [!IMPORTANT]
> La cotización **debe estar en estado APPROVED** para crear una orden de servicio.

---

## Paso 9.1 — Consultar Orden de Servicio (para obtener Task IDs)

**`GET /api/v1/service-orders/<SERVICE_ORDER_ID>`**

La respuesta incluye:
```json
{
    "id": "...",
    "quoteId": "...",
    "orderStatus": "CREATED",
    "creationDate": "...",
    "tasks": [
        {
            "id": "...",
            "mechanicName": "Jorge Ramírez",
            "serviceName": "Cambio de aceite y filtro",
            "status": "PENDING"
        }
    ]
}
```

📌 **Guardar:** el `id` de cada task → lo llamaremos **`TASK_ID`**

---

## Paso 10 — Avanzar Estado de la Orden (CREATED → IN_PROGRESS)

**`PATCH /api/v1/service-orders/<SERVICE_ORDER_ID>/advance-status`**

Sin body. La orden avanza:
- `CREATED` → `IN_PROGRESS`

---

## Paso 11 — Iniciar Tarea (PENDING → IN_PROGRESS)

El mecánico comienza a trabajar:

**`PATCH /api/v1/service-orders/<SERVICE_ORDER_ID>/tasks/<TASK_ID>/start`**

Sin body.

---

## Paso 12 — Completar Tarea (IN_PROGRESS → FINISHED)

El mecánico termina el trabajo:

**`PATCH /api/v1/service-orders/<SERVICE_ORDER_ID>/tasks/<TASK_ID>/complete`**

Sin body.

---

## Paso 13 — Avanzar Estado de la Orden (IN_PROGRESS → FINALIZED)

Una vez completadas todas las tareas:

**`PATCH /api/v1/service-orders/<SERVICE_ORDER_ID>/advance-status`**

Sin body. La orden avanza:
- `IN_PROGRESS` → `FINALIZED`

---

## Paso 14 — Registrar Pago

El cliente paga en caja:

**`POST /api/v1/payments`**

```json
{
    "serviceOrderId": "<SERVICE_ORDER_ID>",
    "amountReceived": 40000,
    "paymentMethod": "CASH"
}
```

📌 **Guardar:** `id` → lo llamaremos **`PAYMENT_ID`**

---

## Paso 15 — Validar Pago

Se confirma que el pago es válido:

**`PATCH /api/v1/payments/<PAYMENT_ID>/validate`**

Sin body.

---

## Paso 16 — Avanzar Estado de la Orden (FINALIZED → DELIVERED)

Se entrega el vehículo al cliente:

**`PATCH /api/v1/service-orders/<SERVICE_ORDER_ID>/advance-status`**

Sin body. La orden avanza:
- `FINALIZED` → `DELIVERED` ✅

---

## 📋 Resumen de Flujo de Estados

### Orden de Servicio
```
CREATED → IN_PROGRESS → FINALIZED → DELIVERED
```

### Tasks
```
PENDING → IN_PROGRESS → FINISHED
```

### Cotización
```
PENDING → APPROVED (o REJECTED)
```

---

## 📡 Endpoints de Consulta Útiles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/v1/customers` | Listar todos los clientes |
| `GET` | `/api/v1/customers/{id}` | Obtener un cliente |
| `GET` | `/api/v1/customers/{id}/vehicles` | Vehículos de un cliente |
| `GET` | `/api/v1/mechanics` | Listar mecánicos |
| `GET` | `/api/v1/mechanics/specialty/{specialty}` | Mecánicos por especialidad |
| `GET` | `/api/v1/services` | Listar servicios |
| `GET` | `/api/v1/categories` | Listar categorías |
| `GET` | `/api/v1/products` | Listar productos |
| `GET` | `/api/v1/quotes/{id}` | Detalle de cotización |
| `GET` | `/api/v1/quotes/customer/{customerId}` | Cotizaciones de un cliente |
| `GET` | `/api/v1/service-orders` | Listar órdenes de servicio |
| `GET` | `/api/v1/service-orders/{id}` | Detalle de orden (incluye tasks) |
| `GET` | `/api/v1/payments/{id}` | Detalle de pago |
