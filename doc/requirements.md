# Requirements — MecaFix Workshop Management System

## Actors
- **Administrator:** manages the daily operations of the workshop
- **Owner:** has all administrator permissions plus access to financial and statistical data

---

## 4.1 Users

- As an administrator, I need to be able to create a new user account with an assigned role so that staff can access the system.
- As an owner, I need to be able to change the role of an existing user so that permissions can be adjusted when responsibilities change.
- As an administrator, I need to be able to retrieve a user's information by their ID so that I can verify account details.

---

## 4.2 Customers

- As an administrator, I need to be able to register a new customer with their personal information so that they can be associated with quotes and service orders.
- As an administrator, I need to be able to find a customer by their ID so that I can quickly access their profile.
- As an administrator, I need to be able to list all registered customers so that I can browse and search through the customer base.
- As an administrator, I need to be able to update a customer's email, phone number, or national ID so that their information stays accurate and up to date.

---

## 4.3 Vehicles

- As an administrator, I need to be able to register a new vehicle and associate it with an existing customer so that it can be used in quotes and service orders.
- As an administrator, I need to be able to search for a vehicle by its license plate so that I can quickly locate it without knowing the customer first.
- As an administrator, I need to be able to list all vehicles belonging to a specific customer so that I can see their complete fleet at a glance.
- As an administrator, I need to be able to update a vehicle's mileage and color so that its information remains current.
- As an administrator, I need to be able to remove a vehicle from a customer's profile so that outdated or incorrectly registered vehicles can be eliminated.

---

## 4.4 Mechanics

- As an administrator, I need to be able to register a new mechanic with their personal data and specialty so that they can be assigned to tasks within service orders.
- As an administrator, I need to be able to retrieve a mechanic's information by their ID so that I can review their profile and availability.
- As an administrator, I need to be able to list all registered mechanics so that I can see the complete workshop staff.
- As an administrator, I need to be able to filter mechanics by their specialty so that I can quickly identify who is qualified for a specific type of job.

---

## 4.5 Services

- As an administrator, I need to be able to register a new service with its labor price so that it can be added to quotes.
- As an administrator, I need to be able to retrieve a service by its ID so that I can review its details.
- As an administrator, I need to be able to list all available services so that I can see the complete service catalog.
- As an administrator, I need to be able to update a service's description and labor price so that the catalog stays accurate.

---

## 4.6 Categories

- As an administrator, I need to be able to create a new product category so that products can be organized and filtered.
- As an administrator, I need to be able to retrieve a category by its ID so that I can review or reference it.
- As an administrator, I need to be able to list all available categories so that I can manage the category structure.

---

## 4.7 Products

- As an administrator, I need to be able to register a new product with its purchase price, sale price, initial stock, and category so that it can be added to quotes and sold directly.
- As an administrator, I need to be able to retrieve a product by its ID so that I can review its current details.
- As an administrator, I need to be able to list all products in the inventory so that I can browse the full catalog.
- As an administrator, I need to be able to update the stock of a product so that inventory levels stay accurate after purchases or sales.
- As an administrator, I need to be able to update the purchase and sale price of a product so that pricing stays current.

---

## 4.8 Quotes

- As an administrator, I need to be able to create a quote for a customer and their vehicle with an initial list of services and products so that the customer can review and decide.
- As an administrator, I need to be able to add a service or product to an existing pending quote so that the quote can be adjusted before the customer responds.
- As an administrator, I need to be able to retrieve a quote by its ID so that I can review its full details at any time.
- As an administrator, I need to be able to list all quotes associated with a specific customer so that I can see their complete quote history.
- As an administrator, I need to be able to approve a quote so that it moves forward to payment or service order creation depending on its contents.
- As an administrator, I need to be able to reject a quote so that it is closed when the customer declines.

---

## 4.9 Service Orders

- As an administrator, I need to be able to create a service order from an approved quote by assigning a mechanic to each service so that the workshop work can begin.
- As an administrator, I need to be able to advance the status of a service order so that its progress is reflected accurately at each stage.
- As an administrator, I need to be able to mark a task as in progress so that the mechanic's current work is tracked.
- As an administrator, I need to be able to mark a task as completed so that finished work is registered and the mechanic becomes available again.
- As an administrator, I need to be able to retrieve a service order by its ID so that I can review its full details and current state.
- As an administrator, I need to be able to list all service orders so that I can monitor the workshop's active and historical workload.

---

## 4.10 Payments

- As an administrator, I need to be able to register a payment for a completed service order by specifying the method and amount received so that the transaction is officially recorded and the order is closed.
- As an administrator, I need to be able to retrieve a payment by its ID so that I can verify its details.
- As an administrator, I need to be able to validate whether a payment fully covers the total amount of its associated order so that partial payments can be identified and handled.

---

## 4.11 Statistics (Owner only)

- As an owner, I need to be able to view a financial summary including total income, expenses, and net profit for a given period so that I can evaluate the business performance.
