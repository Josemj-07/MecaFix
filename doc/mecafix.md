```mermaid
classDiagram
direction BT
class category {
   varchar(255) name
   uuid id
}
class customer {
   varchar(255) firstname
   varchar(255) lastname
   varchar(255) email
   varchar(255) mobilephone
   varchar(255) dni
   uuid id
}
class mechanic {
   varchar(255) firstname
   varchar(255) lastname
   varchar(255) email
   varchar(255) mobilephone
   varchar(255) dni
   varchar(255) speciality
   uuid id
}
class payment {
   numeric(12,3) amounttopay
   numeric(12,3) amountreceived
   timestamp date
   varchar(255) paymentmethod
   uuid id_service_order
   uuid id
}
class product {
   varchar(255) name
   varchar(500) description
   numeric(12,3) purchaseprice
   numeric(12,3) saleprice
   integer stock
   uuid id_category
   uuid id
}
class product_detail {
   integer quantity
   numeric(12,3) appliedprice
   uuid id_product
   uuid id_quote
   uuid id
}
class quote {
   uuid id_vehicle
   varchar(255) status
   numeric(12,3) totalamount
   timestamp creationdate
   uuid id
}
class service {
   varchar(255) name
   varchar(255) description
   numeric(12,3) laborprice
   uuid id
}
class service_detail {
   numeric(12,3) appliedlaborprice
   uuid id_service
   uuid id_quote
   uuid id
}
class service_order {
   uuid id_quote
   varchar(255) orderstatus
   timestamp creationdate
   uuid id
}
class task {
   uuid id_mechanic
   uuid id_service_detail
   varchar(255) status
   timestamp creationdate
   timestamp finisheddate
   uuid id_service_order
   uuid id
}
class user_auth {
   varchar(255) email
   varchar(255) passwordhash
   varchar(255) name
   varchar(255) rola
   uuid id
}
class vehicule {
   varchar(255) plate
   varchar(255) brand
   varchar(255) model
   integer manufacturingyear
   integer mileage
   varchar(255) color
   uuid id_customer
   uuid id
}

payment  -->  service_order : id_service_order:id
product  -->  category : id_category:id
product_detail  -->  product : id_product:id
product_detail  -->  quote : id_quote:id
quote  -->  vehicule : id_vehicle:id
service_detail  -->  quote : id_quote:id
service_detail  -->  service : id_service:id
service_order  -->  quote : id_quote:id
task  -->  mechanic : id_mechanic:id
task  -->  service_detail : id_service_detail:id
task  -->  service_order : id_service_order:id
vehicule  -->  customer : id_customer:id
```