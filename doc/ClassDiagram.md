# Class diagram for MecaFix ⚙️

The objective of the class diagram is to show the modeling of the domain layer, allowing
us to observe what each and every one of the entities that compose it are **made of**, and what relationships exist between them.

Creating a diagram helps to *structure* the design of any type of solution in a better way, since visually it becomes possible to
analyze the responsibilities that each actor holds within the scope of the problem, and it avoids carrying into the implementation phase possible errors in the representation of the entities
or in how they interact with each other; it is always necessary to think before writing any line of code to prevent multiple
rethinks from occurring during development due to flaws that were not identified from the start thanks to a lack of planning.

The diagram was made under the **UML** standard
```mermaid
classDiagram
    direction TB

%% ── AUTHENTICATION ─────────────────────────────────
    class User {
        -Long id
        -String name
        -String email
        -String passwordHash
        -Role role
        +getId() Long
        +getName() String
        +getEmail() String
        +getRole() Role
    }

    class Role {
        <<enumeration>>
        ADMINISTRATOR
        OWNER
    }

%% ── PEOPLE ─────────────────────────────────────────
    class Email {
<<value object>>
-String address
+getAddress() String
+isValid() boolean
}

class Person {
<<abstract>>
-Long id
-String firstName
-String lastName
-Email email
-String mobilePhone
-String nationalId
-DateTime registrationDate
+getId() Long
+getFullName() String
+getEmail() Email
+getNationalId() String
+getRegistrationDate() DateTime
}

class Customer {
    }

class Mechanic {
-Specialty specialty
-boolean available
+getSpecialty() Specialty
+isAvailable() boolean
+setAvailable(boolean) void
}

class Specialty {
<<enumeration>>
ENGINE
BRAKES
ELECTRICAL
SUSPENSION
GENERAL
}

%% ── VEHICLE ────────────────────────────────────────
class Vehicle {
-Long id
-String plate
-String brand
-String model
-int manufacturingYear
-int mileage
-String color
+getPlate() String
+getBrand() String
+getModel() String
+getManufacturingYear() int
+getMileage() int
+setMileage(int) void
+getColor() String
}

%% ── SERVICE ────────────────────────────────────────
class Service {
-Long id
-String name
-String description
-BigDecimal laborPrice
+getId() Long
+getName() String
+getDescription() String
+getLaborPrice() BigDecimal
    }

class ServiceDetail {
-Service service
-BigDecimal appliedPrice
+getService() Service
+getAppliedPrice() BigDecimal
+calculateSubTotal() BigDecimal
}

%% ── QUOTE ──────────────────────────────────────────
class QuoteStatus {
<<enumeration>>
PENDING
APPROVED
REJECTED
    }

class QuoteProductDetail {
-Product product
-int quantity
-BigDecimal appliedUnitPrice
+getProduct() Product
+getQuantity() int
+getAppliedUnitPrice() BigDecimal
+calculateSubTotal() BigDecimal
}

class Quote {
-Long id
-Customer customer
-Vehicle vehicle
-List~ServiceDetail~ services
-List~QuoteProductDetail~ products
-QuoteStatus status
-BigDecimal totalAmount
-DateTime date
+getCustomer() Customer
+getVehicle() Vehicle
+getServices() Collection~ServiceDetail~
+getProducts() Collection~QuoteProductDetail~
+addService(ServiceDetail) void
+addProduct(QuoteProductDetail) void
+updateTotal() void
+approve() void
+reject() void
+getStatus() QuoteStatus
+getTotalAmount() BigDecimal
}

%% ── SERVICE ORDER ───────────────────────────────────
class OrderStatus {
<<enumeration>>
PENDING
IN_PROGRESS
FINISHED
DELIVERED
}

class ServiceOrder {
-Long id
-Quote quote
-List~Task~ tasks
-OrderStatus status
-DateTime creationDate
+getQuote() Quote
+getTasks() Collection~Task~
+addTask(Task) void
+getTotal() BigDecimal
+getId() Long
+getStatus() OrderStatus
+getCreationDate() DateTime
+advanceStatus() void
}

class TaskStatus {
<<enumeration>>
PENDING
IN_PROGRESS
FINISHED
    }

class Task {
-Long id
-Mechanic mechanic
-ServiceDetail serviceDetail
-TaskStatus status
+getMechanic() Mechanic
+getServiceDetail() ServiceDetail
+getStatus() TaskStatus
+markInProgress() void
+markFinished() void
}

%% ── PRODUCTS AND SALES ─────────────────────────────
class Product {
-Long id
-String name
-BigDecimal purchasePrice
-BigDecimal salePrice
-int stock
-String description
+getId() Long
+getName() String
+getPurchasePrice() BigDecimal
+getSalePrice() BigDecimal
+getStock() int
+decreaseStock(int) void
+increaseStock(int) void
}

class SaleDetail {
-Product product
-int quantity
-BigDecimal unitPrice
+getProduct() Product
+getQuantity() int
+getUnitPrice() BigDecimal
+calculateSubTotal() BigDecimal
}

class Sale {
-Long id
-Customer customer
-List~SaleDetail~ details
-DateTime date
-BigDecimal total
+getCustomer() Customer
+getDetails() Collection~SaleDetail~
+addDetail(SaleDetail) void
+calculateTotal() BigDecimal
+getId() Long
+getDate() DateTime
+getTotal() BigDecimal
}

%% ── PAYMENT ────────────────────────────────────────
class PaymentMethod {
<<enumeration>>
CASH
TRANSFER
WOMPI
    }

class Payment {
<<abstract>>
-Long id
-BigDecimal amount
-DateTime date
-PaymentMethod paymentMethod
+validatePayment() boolean
+getId() Long
+getAmount() BigDecimal
+getDate() DateTime
+getPaymentMethod() PaymentMethod
    }

class ServiceOrderPayment {
-ServiceOrder serviceOrder
+getServiceOrder() ServiceOrder
    }

class SalePayment {
-Sale sale
+getSale() Sale
    }

%% ════════════════════════════════════════════════════
%% RELATIONSHIPS
%% ════════════════════════════════════════════════════

User --> Role : role

Person --> Email : email
Person <|-- Customer
Person <|-- Mechanic
Mechanic --> Specialty : specialty

Customer "1" *-- "0..*" Vehicle : vehicles

Quote --> Customer : customer
Quote --> Vehicle : vehicle
Quote --> QuoteStatus : status
Quote "1" o-- "1..*" ServiceDetail : services
Quote "1" o-- "0..*" QuoteProductDetail : products
ServiceDetail --> Service : service
QuoteProductDetail --> Product : product

ServiceOrder --> Quote : quote
ServiceOrder --> OrderStatus : status
ServiceOrder "1" o-- "1..*" Task : tasks
Task --> Mechanic : mechanic
Task --> ServiceDetail : serviceDetail
Task --> TaskStatus : status

Sale --> Customer : customer
Sale "1" o-- "1..*" SaleDetail : details
SaleDetail --> Product : product

Payment --> PaymentMethod : paymentMethod
Payment <|-- ServiceOrderPayment
Payment <|-- SalePayment
ServiceOrderPayment --> ServiceOrder : serviceOrder
SalePayment --> Sale : sale
```