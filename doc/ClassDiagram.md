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
direction LR

class Customer {
  +UUID id
  +String fullName
  +String documentNumber
  +String phone
  +String email
  +LocalDateTime createdAt
}

class Vehicle {
  +UUID id
  +String plate
  +String vin
  +String brand
  +String model
  +int year
  +String color
  +UUID customerId
  +LocalDateTime createdAt
}

class Mechanic {
  +UUID id
  +String fullName
  +String phone
  +String specialty
  +boolean active
}

class Category {
  +UUID id
  +String name
  +String description
  +boolean active
}

class Product {
  +UUID id
  +String name
  +String sku
  +String description
  +BigDecimal unitPrice
  +int stock
  +UUID categoryId
  +boolean active
}

class Service {
  +UUID id
  +String name
  +String description
  +BigDecimal basePrice
  +UUID categoryId
  +boolean active
}

class Quote {
  +UUID id
  +UUID customerId
  +UUID vehicleId
  +QuoteStatus status
  +BigDecimal subtotal
  +BigDecimal tax
  +BigDecimal total
  +LocalDateTime createdAt
  +LocalDateTime expiresAt
}

class QuoteItem {
  +UUID id
  +UUID quoteId
  +ItemType itemType
  +UUID referenceId
  +String description
  +BigDecimal unitPrice
  +int quantity
  +BigDecimal lineTotal
}

class ServiceOrder {
  +UUID id
  +UUID customerId
  +UUID vehicleId
  +UUID quoteId
  +UUID mechanicId
  +OrderStatus status
  +BigDecimal subtotal
  +BigDecimal tax
  +BigDecimal total
  +LocalDateTime openedAt
  +LocalDateTime startedAt
  +LocalDateTime finishedAt
}

class ServiceOrderItem {
  +UUID id
  +UUID serviceOrderId
  +ItemType itemType
  +UUID referenceId
  +String description
  +BigDecimal unitPrice
  +int quantity
  +BigDecimal lineTotal
}

class Payment {
  +UUID id
  +UUID serviceOrderId
  +PaymentMethod method
  +PaymentStatus status
  +BigDecimal amount
  +String reference
  +LocalDateTime paidAt
}

class QuoteStatus {
  <<enumeration>>
  DRAFT
  APPROVED
  REJECTED
  EXPIRED
}

class OrderStatus {
  <<enumeration>>
  OPEN
  IN_PROGRESS
  COMPLETED
  DELIVERED
  CANCELLED
}

class ItemType {
  <<enumeration>>
  PRODUCT
  SERVICE
}

class PaymentMethod {
  <<enumeration>>
  CASH
  CARD
  TRANSFER
  DIGITAL_WALLET
}

class PaymentStatus {
  <<enumeration>>
  PENDING
  PAID
  FAILED
  REFUNDED
}

Customer "1" --> "0..*" Vehicle : owns
Category "1" --> "0..*" Product : groups
Category "1" --> "0..*" Service : groups

Customer "1" --> "0..*" Quote : requests
Vehicle "1" --> "0..*" Quote : quoted for
Quote "1" --> "1..*" QuoteItem : contains

Customer "1" --> "0..*" ServiceOrder : opens
Vehicle "1" --> "0..*" ServiceOrder : receives
Mechanic "0..1" --> "0..*" ServiceOrder : assigned to
Quote "0..1" --> "0..1" ServiceOrder : converts to
ServiceOrder "1" --> "1..*" ServiceOrderItem : contains

ServiceOrder "1" --> "0..*" Payment : paid with

Quote --> QuoteStatus
ServiceOrder --> OrderStatus
QuoteItem --> ItemType
ServiceOrderItem --> ItemType
Payment --> PaymentMethod
Payment --> PaymentStatus
```
