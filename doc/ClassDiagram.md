# Diagrama de clases para MecaFix ⚙️

El objetivo del diagrama de clases es mostrar modelado de la capa de dominio, permitiendo 
observar de qué se **componen** todas y cada una de las entidades que la conforman, y que relaciones existen entre estas.

Realizar un diagrama ayuda a *estructurar* de mejor manera el diseño de cualquier tipo de solución, ya que de manera visual se logra
analizar las responsabilidades que cada actor posee dentro del radio de acción del problema, y se evita llevar a la parte de implementación posibles errores de representación de las entidades
o de como estas interactúan con las otras; siempre es necesario pensar antes de escribir cualquier línea de código para evitar que en el desarrollo ocurran múltiples
re-planteamientos debido a fallas encontradas y que en un principio no fueron identificadas gracias a la falta de planificación.

El diagrama se realizó bajo el estándar **UML**

```mermaid
classDiagram
    direction TB

    %% ── AUTENTICACIÓN ──────────────────────────────────
    class Usuario {
        -Long id
        -String nombre
        -String email
        -String passwordHash
        -Rol rol
        +getId() Long
        +getNombre() String
        +getEmail() String
        +getRol() Rol
    }

    class Rol {
        <<enumeration>>
        ADMINISTRADOR
        DUENO
    }

    %% ── PERSONAS ───────────────────────────────────────
    class Email {
        <<value object>>
        -String direccion
        +getDireccion() String
        +esValido() boolean
    }

    class Persona {
        <<abstract>>
        -Long id
        -String nombre
        -String apellido
        -Email email
        -String telefonoCelular
        -String dni
        -DateTime fechaRegistro
        +getId() Long
        +getNombreCompleto() String
        +getEmail() Email
        +getDni() String
        +getFechaRegistro() DateTime
    }

    class Cliente {
    }

    class Mecanico {
        -Especialidad especialidad
        -boolean disponible
        +getEspecialidad() Especialidad
        +isDisponible() boolean
        +setDisponible(boolean) void
    }

    class Especialidad {
        <<enumeration>>
        MOTOR
        FRENOS
        ELECTRICIDAD
        SUSPENSION
        GENERAL
    }

    %% ── VEHÍCULO ───────────────────────────────────────
    class Vehiculo {
        -Long id
        -String placa
        -String marca
        -String modelo
        -int anioDeFabricacion
        -int kilometraje
        -String color
        +getPlaca() String
        +getMarca() String
        +getModelo() String
        +getAnioDeFabricacion() int
        +getKilometraje() int
        +setKilometraje(int) void
        +getColor() String
    }

    %% ── SERVICIO ───────────────────────────────────────
    class Servicio {
        -Long id
        -String nombre
        -String descripcion
        -BigDecimal precioManoObra
        +getId() Long
        +getNombre() String
        +getDescripcion() String
        +getPrecioManoObra() BigDecimal
    }

    class DetalleServicio {
        -Servicio servicio
        -BigDecimal precioAplicado
        +getServicio() Servicio
        +getPrecioAplicado() BigDecimal
        +calcularSubTotal() BigDecimal
    }

    %% ── COTIZACIÓN ─────────────────────────────────────
    class EstadoCotizacion {
        <<enumeration>>
        PENDIENTE
        APROBADA
        RECHAZADA
    }

    class DetalleProductoCotizacion {
        -Producto producto
        -int cantidad
        -BigDecimal precioUnitarioAplicado
        +getProducto() Producto
        +getCantidad() int
        +getPrecioUnitarioAplicado() BigDecimal
        +calcularSubTotal() BigDecimal
    }

    class Cotizacion {
        -Long id
        -Cliente cliente
        -Vehiculo vehiculo
        -List~DetalleServicio~ servicios
        -List~DetalleProductoCotizacion~ productos
        -EstadoCotizacion estado
        -BigDecimal montoTotal
        -DateTime fecha
        +getCliente() Cliente
        +getVehiculo() Vehiculo
        +getServicios() Collection~DetalleServicio~
        +getProductos() Collection~DetalleProductoCotizacion~
        +agregarServicio(DetalleServicio) void
        +agregarProducto(DetalleProductoCotizacion) void
        +actualizarTotal() void
        +aprobar() void
        +rechazar() void
        +getEstado() EstadoCotizacion
        +getMontoTotal() BigDecimal
    }

    %% ── ORDEN DE SERVICIO ──────────────────────────────
    class EstadoOrden {
        <<enumeration>>
        PENDIENTE
        EN_PROCESO
        TERMINADA
        ENTREGADA
    }

    class OrdenServicio {
        -Long id
        -Cotizacion cotizacion
        -List~Tarea~ tareas
        -EstadoOrden estado
        -DateTime fechaCreacion
        +getCotizacion() Cotizacion
        +getTareas() Collection~Tarea~
        +agregarTarea(Tarea) void
        +getTotal() BigDecimal
        +getId() Long
        +getEstado() EstadoOrden
        +getFechaCreacion() DateTime
        +avanzarEstado() void
    }

    class EstadoTarea {
        <<enumeration>>
        PENDIENTE
        EN_PROCESO
        FINALIZADA
    }

    class Tarea {
        -Long id
        -Mecanico mecanico
        -DetalleServicio detalleServicio
        -EstadoTarea estado
        +getMecanico() Mecanico
        +getDetalleServicio() DetalleServicio
        +getEstado() EstadoTarea
        +marcarEnProceso() void
        +marcarFinalizada() void
    }

    %% ── PRODUCTOS Y VENTAS ─────────────────────────────
    class Producto {
        -Long id
        -String nombre
        -BigDecimal precioCompra
        -BigDecimal precioVenta
        -int stock
        -String descripcion
        +getId() Long
        +getNombre() String
        +getPrecioCompra() BigDecimal
        +getPrecioVenta() BigDecimal
        +getStock() int
        +disminuirStock(int) void
        +aumentarStock(int) void
    }

    class DetalleVenta {
        -Producto producto
        -int cantidad
        -BigDecimal precioUnitario
        +getProducto() Producto
        +getCantidad() int
        +getPrecioUnitario() BigDecimal
        +calcularSubTotal() BigDecimal
    }

    class Venta {
        -Long id
        -Cliente cliente
        -List~DetalleVenta~ detalles
        -DateTime fecha
        -BigDecimal total
        +getCliente() Cliente
        +getDetalles() Collection~DetalleVenta~
        +agregarDetalle(DetalleVenta) void
        +calcularTotal() BigDecimal
        +getId() Long
        +getFecha() DateTime
        +getTotal() BigDecimal
    }

    %% ── PAGO ───────────────────────────────────────────
    class MetodoPago {
        <<enumeration>>
        EFECTIVO
        TRANSFERENCIA
        WOMPI
    }

    class Pago {
        <<abstract>>
        -Long id
        -BigDecimal monto
        -DateTime fecha
        -MetodoPago metodoPago
        +validarPago() boolean
        +getId() Long
        +getMonto() BigDecimal
        +getFecha() DateTime
        +getMetodoPago() MetodoPago
    }

    class PagoOrdenServicio {
        -OrdenServicio ordenServicio
        +getOrdenServicio() OrdenServicio
    }

    class PagoVenta {
        -Venta venta
        +getVenta() Venta
    }

    %% ════════════════════════════════════════════════════
    %% RELACIONES
    %% ════════════════════════════════════════════════════

    Usuario --> Rol : rol

    Persona --> Email : email
    Persona <|-- Cliente
    Persona <|-- Mecanico
    Mecanico --> Especialidad : especialidad

    Cliente "1" *-- "0..*" Vehiculo : vehiculos

    Cotizacion --> Cliente : cliente
    Cotizacion --> Vehiculo : vehiculo
    Cotizacion --> EstadoCotizacion : estado
    Cotizacion "1" o-- "1..*" DetalleServicio : servicios
    Cotizacion "1" o-- "0..*" DetalleProductoCotizacion : productos
    DetalleServicio --> Servicio : servicio
    DetalleProductoCotizacion --> Producto : producto

    OrdenServicio --> Cotizacion : cotizacion
    OrdenServicio --> EstadoOrden : estado
    OrdenServicio "1" o-- "1..*" Tarea : tareas
    Tarea --> Mecanico : mecanico
    Tarea --> DetalleServicio : detalleServicio
    Tarea --> EstadoTarea : estado

    Venta --> Cliente : cliente
    Venta "1" o-- "1..*" DetalleVenta : detalles
    DetalleVenta --> Producto : producto

    Pago --> MetodoPago : metodoPago
    Pago <|-- PagoOrdenServicio
    Pago <|-- PagoVenta
    PagoOrdenServicio --> OrdenServicio : ordenServicio
    PagoVenta --> Venta : venta
```
