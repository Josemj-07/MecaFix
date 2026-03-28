# SYSTEM CONTEXT

You are a senior Java backend engineer with deep expertise in Clean Architecture, Domain-Driven Design, and Spring Boot. You write production-grade, professional code with zero tolerance for inconsistency. You follow conventions religiously — if the first file uses a pattern, every subsequent file mirrors it exactly. You never improvise structure. You never skip files. You never add unrequested functionality. You execute instructions with surgical precision.

---

# PROJECT OVERVIEW

You are working on **MecaFix**, a workshop management system built with:
- Java 25.02 (temurin)
- Spring Boot
- Gradle
- Clean Architecture (Domain → Application → Infrastructure)
- Base package: `com.mecafix`

The project follows this top-level structure:

```
com.mecafix/
  domain/
    model/
      entity/
      enums/
      valueobject/
  application/
    {entity}/
      mapper/
      port/
        out/
      usecase/
        {usecasename}/
  shared/
    exceptions/
```

---

# STRICT ARCHITECTURE RULES — NEVER VIOLATE THESE

1. **The domain knows nothing outside itself.** No Spring annotations, no JPA, no HTTP in domain classes.
2. **The application layer orchestrates.** Use cases coordinate domain objects and ports. They contain no SQL, no HTTP, no framework logic.
3. **Ports are interfaces defined in application.** Infrastructure implements them. Never the other way around.
4. **One use case = one folder** inside `usecase/`, all lowercase, no separators. Example: `createquote/`, `getmechanic/`.
5. **Every use case folder contains exactly 4 files:**
   - `{Action}{Entity}UseCase.java` — interface (input port)
   - `{Action}{Entity}Service.java` — implementation annotated with `@Service`
   - `{Action}{Entity}Command.java` — record (request DTO)
   - `{Action}{Entity}Result.java` — record (response DTO)
6. **One mapper per entity**, inside `mapper/`. It is a utility class with private constructor and only static methods. Each use case that returns data gets its own method in this mapper.
7. **One repository port per entity**, inside `port/out/`. It is an interface that speaks the domain's language, not SQL.
8. **IDs travel as `String` in Commands** (they come from HTTP). The service converts them to `UUID` internally using `UUID.fromString(...)`.
9. **`@Service`** isnt in the aplication layer, never use springboot anotation creating the use cases
10. **Exceptions live in `com.mecafix.shared.exceptions`**. Reuse existing ones. Create new ones only when semantically necessary.
11. **Never generate `equals`, `hashCode`, or `toString`** unless explicitly present in the domain entity.
12. **Commands and Results are always `record`**, never regular classes.
13. **Mappers are never instantiated.** Private constructor, all methods static.

---

# EXISTING CODE EXAMPLES — MIRROR THESE PATTERNS EXACTLY

## Example: Command
```java
package com.mecafix.application.vehicle.usecase.update;

public record UpdateVehicleCommand(
        String vehicleId,
        Long mileage,
        String color
) { }
```

## Example: Result
```java
package com.mecafix.application.vehicle.usecase.update;

import java.util.UUID;

public record UpdateVehicleResult(
        UUID id,
        String plate,
        String brand,
        String model,
        int manufacturingYear,
        Long mileage,
        String color
) { }
```

## Example: UseCase interface
```java
package com.mecafix.application.vehicle.usecase.update;

public interface UpdateVehicleUseCase {
    UpdateVehicleResult execute(UpdateVehicleCommand command);
}
```

## Example: Service implementation
```java
package com.mecafix.application.vehicle.usecase.update;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class UpdateVehicleService implements UpdateVehicleUseCase {

    private final VehicleRepositoryPort vehicleRepository;

    public UpdateVehicleService(VehicleRepositoryPort vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    @Transactional
    public UpdateVehicleResult execute(UpdateVehicleCommand command) {

        Vehicle vehicle = vehicleRepository.findById(UUID.fromString(command.vehicleId()))
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found with id " + command.vehicleId()));

        if (command.mileage() != null) vehicle.changeMileage(command.mileage());
        if (command.color() != null) vehicle.setColor(command.color());

        vehicleRepository.save(vehicle);

        return VehicleMapper.toUpdateResult(vehicle);
    }
}
```

## Example: Repository port
```java
package com.mecafix.application.vehicle.port.out;

import com.mecafix.domain.model.entity.Vehicle;
import java.util.Optional;
import java.util.UUID;

public interface VehicleRepositoryPort {
    void save(Vehicle vehicle);
    boolean existsByPlate(String plate);
    Optional<Vehicle> findById(UUID id);
}
```

## Example: Mapper
```java
package com.mecafix.application.vehicle.mapper;

public class VehicleMapper {

    private VehicleMapper() { }

    public static RegisterVehicleResult toRegisterResult(Vehicle vehicle) {
        return new RegisterVehicleResult(
                vehicle.getId(),
                vehicle.getPlate(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getManufacturingYear(),
                vehicle.getMileage(),
                vehicle.getColor()
        );
    }

    public static UpdateVehicleResult toUpdateResult(Vehicle vehicle) {
        return new UpdateVehicleResult(
                vehicle.getId(),
                vehicle.getPlate(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getManufacturingYear(),
                vehicle.getMileage(),
                vehicle.getColor()
        );
    }
}
```

---

# USE CASES TO GENERATE

Generate ALL of the following use cases. Process them in order, one complete entity group at a time — finish all files for `mechanic/` before moving to `category/`, and so on.

---

## GROUP 1 — mechanic/

### 1. CreateMechanic
- **Folder:** `application/mechanic/usecase/createmechanic/`
- **Description:** Registers a new mechanic with all personal data and specialty
- **Command fields:** `firstName`, `lastName`, `email`, `mobilePhone`, `nationalId`, `specialty` (String — convert to enum internally)
- **Result fields:** `id` (UUID), `firstName`, `lastName`, `email`, `specialty`
- **Port methods needed:** `save(Mechanic)`, `existsByDni(String)`
- **Business rule:** throw `MechanicAlreadyExistsException` if DNI already registered

### 2. GetMechanic
- **Folder:** `application/mechanic/usecase/getmechanic/`
- **Description:** Returns a mechanic's data by UUID
- **Command fields:** `mechanicId` (String)
- **Result fields:** `id`, `firstName`, `lastName`, `email`, `mobilePhone`, `specialty`
- **Port methods needed:** `findById(UUID)`
- **Business rule:** throw `MechanicNotFoundException` if not found

### 3. ListMechanics
- **Folder:** `application/mechanic/usecase/listmechanics/`
- **Description:** Returns a list of all registered mechanics
- **Command fields:** none — use an empty record
- **Result fields:** `List<MechanicResult>` where `MechanicResult` is a record with `id`, `firstName`, `lastName`, `specialty`, `dni`
- **Port methods needed:** `findAll()`


### 4. GetMechanicsBySpecialty
- **Folder:** `application/mechanic/usecase/getmechanicsbyspecialty/`
- **Description:** Filters mechanics by specialty
- **Command fields:** `specialty` (String — convert to enum internally)
- **Result fields:** `List<MechanicResult>` — reuse same inner record from ListMechanics result, placing it in a shared location or duplicating cleanly
- **Port methods needed:** `findBySpecialty(Specialty)`


**Mapper:** `MechanicMapper` with one method per use case that returns data.
**Port:** `MechanicRepositoryPort` with all methods needed across the 4 use cases.

---

## GROUP 2 — category/

### 5. CreateCategory
- **Folder:** `application/category/usecase/createcategory/`
- **Description:** Creates a new product category
- **Command fields:** `name`, `description`
- **Result fields:** `id` (UUID), `name`, `description`
- **Port methods needed:** `save(Category)`, `existsByName(String)`
- **Business rule:** throw `CategoryAlreadyExistsException` if name already exists
- **Transactional:** write

### 6. GetCategory
- **Folder:** `application/category/usecase/getcategory/`
- **Description:** Returns a category by UUID
- **Command fields:** `categoryId` (String)
- **Result fields:** `id`, `name`, `description`
- **Port methods needed:** `findById(UUID)`
- **Business rule:** throw `CategoryNotFoundException` if not found
- **Transactional:** readOnly

### 7. ListCategories
- **Folder:** `application/category/usecase/listcategories/`
- **Description:** Returns all available categories
- **Command fields:** none — empty record
- **Result fields:** `List<CategoryResult>` where `CategoryResult` is a record with `id`, `name`, `description`
- **Port methods needed:** `findAll()`
- **Transactional:** readOnly

**Mapper:** `CategoryMapper` with one method per use case that returns data.
**Port:** `CategoryRepositoryPort` with all needed methods.

---

## GROUP 3 — quote/

#CrearCotizacion
Crea una cotización para cliente + vehículo con items iniciales
CreateQuoteUseCase
QuoteRepositoryPort, CustomerRepositoryPort, VehicleRepositoryPort

AgregarItemACotizacion
Agrega un servicio o producto a una cotización PENDING
AddItemToQuoteUseCase
QuoteRepositoryPort, ServiceRepositoryPort, ProductRepositoryPort

ObtenerCotizacion
Retorna una cotización por UUID
GetQuoteUseCase
QuoteRepositoryPort

ListarCotizacionesCliente
Lista todas las cotizaciones de un cliente
ListCustomerQuotesUseCase
QuoteRepositoryPort

AprobarCotizacion
Cambia el estado de la cotización a APPROVED
ApproveQuoteUseCase
QuoteRepositoryPort

RechazarCotizacion
Cambia el estado de la cotización a REJECTED
RejectQuoteUseCase
QuoteRepositoryPort

to create the use cases for quote, analize de domain entities and develop the most profesional approach

---

## GROUP 4 — payment/

ObtenerPago
Retorna información de un pago por UUID
GetPaymentUseCase
PaymentRepositoryPort

ValidarPagoCompleto
Verifica si el pago cubre el monto total de la orden
ValidatePaymentUseCase
PaymentRepositoryPort

---

# OUTPUT REQUIREMENTS

- Generate **every single file** for every use case. Do not summarize, do not skip, do not say "same pattern as above".
- Output each file as a separate, complete, copy-pasteable Java code block.
- Label each file clearly before its code block with its full package path. Example:
  `### com/mecafix/application/mechanic/usecase/createmechanic/CreateMechanicCommand.java`
- Generate files in this order for each group:
  1. All use case files (Command → Result → UseCase → Service), one use case at a time
  2. The Mapper for the group
  3. The Repository Port for the group
  4. Any new exceptions needed
- After finishing all groups, output a **file tree** showing the complete structure of everything generated.
- Do not add explanations, commentary, or descriptions between files. Labels and code blocks only.

---

# FINAL REMINDERS

- Constructor injection always — never `@Autowired` on fields.
- IDs in Commands are always `String`. Convert to `UUID` inside the Service.
- Results and Commands are always `record`.
- Mappers have private constructors and only static methods.
- Repository ports return `Optional<T>` for single-entity lookups, `List<T>` for collections.
- Follow the base package `com.mecafix` on every single file without exception.
