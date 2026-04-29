create table mechanic
(
    id          uuid         not null primary key,
    firstname   varchar(255) not null,
    lastname    varchar(255) not null,
    email       varchar(255) not null,
    mobilephone varchar(255) not null unique,
    dni         varchar(255) not null unique,
    specialty   varchar(255) not null
);


create table category
(
    id   uuid         not null primary key,
    name varchar(255) not null
);


create table product
(
    id            uuid           not null primary key,
    name          varchar(255)   not null,
    description   varchar(500),
    purchaseprice numeric(12,3)  not null
        constraint purchase_price_check
            check (purchaseprice >= 0),
    saleprice     numeric(12,3)  not null
        constraint sale_price_check
            check (saleprice >= 0),
    stock         integer        not null
        constraint stock_check
            check (stock >= 0),
    id_category   uuid not null
        constraint fk_product_category
            references public.category(id)
);


create table customer
(
    id          uuid         not null primary key,
    firstname   varchar(255) not null,
    lastname    varchar(255) not null,
    email       varchar(255) not null,
    mobilephone varchar(255) not null unique,
    dni         varchar(255) not null unique
);


create table vehicle
(
    id                uuid         not null primary key,
    plate             varchar(255) not null unique,
    brand             varchar(255) not null,
    model             varchar(255) not null,
    manufacturingyear integer      not null,
    mileage           integer      not null,
    color             varchar(255) not null,
    id_customer       uuid not null
        constraint fk_vehicle_customer
            references public.customer(id)
);


create table user_auth
(
    id           uuid         not null primary key,
    email        varchar(255) not null unique,
    passwordhash varchar(255) not null,
    name         varchar(255) not null,
    role         varchar(255) not null
);


create table service
(
    id          uuid         not null primary key,
    name        varchar(255) not null,
    description varchar(255) not null,
    laborprice  numeric(12,3)
        constraint labor_price_check
            check (laborprice >= 0)
);


create table quote
(
    id           uuid           not null primary key,
    id_vehicle   uuid           not null
        constraint fk_quote_vehicle
            references public.vehicle(id),
    status       varchar(255)   not null,
    totalamount  numeric(12,3)  not null
        constraint total_amount_check
            check (totalamount >= 0),
    creationdate timestamp      not null
);


create table service_detail
(
    id           uuid           not null primary key,
    appliedprice numeric(12,3)  not null
        constraint service_detail_price_check
            check (appliedprice >= 0),
    id_service   uuid           not null
        constraint fk_service_detail_service
            references public.service(id),
    id_quote     uuid           not null
        constraint fk_service_detail_quote
            references public.quote(id)
);


create table product_detail
(
    id           uuid           not null primary key,
    quantity     integer        not null
        constraint quantity_check
            check (quantity > 0),
    appliedprice numeric(12,3)  not null
        constraint product_detail_price_check
            check (appliedprice >= 0),
    id_product   uuid           not null
        constraint fk_product_detail_product
            references public.product(id),
    id_quote     uuid           not null
        constraint fk_product_detail_quote
            references public.quote(id)
);


create table service_order
(
    id           uuid         not null primary key,
    id_quote     uuid         not null
        constraint fk_service_order_quote
            references public.quote(id),
    orderstatus  varchar(255) not null,
    creationdate timestamp    not null
);


create table task
(
    id               uuid         not null primary key,
    id_mechanic      uuid         not null
        constraint fk_task_mechanic
            references public.mechanic(id),
    status           varchar(255) not null,
    creationdate     timestamp    not null,
    finisheddate     timestamp,
    id_service_order uuid not null
        constraint fk_task_service_order
            references public.service_order(id)
);


create table payment
(
    id               uuid           not null primary key,
    amounttopay      numeric(12,3)  not null
        constraint amount_to_pay_check
            check (amounttopay >= 0),
    amountreceived   numeric(12,3)  not null
        constraint amount_received_check
            check (amountreceived >= 0),
    date             timestamp      not null,
    paymentmethod    varchar(255)   not null,
    id_service_order uuid           not null
        constraint fk_payment_service_order
            references public.service_order(id)
);


INSERT INTO user_auth (id, email, passwordhash, name, role)
VALUES (
    '6cae5e4e-b842-4c2b-ac3a-a261c533b2f5',
    'admin@example.com',
    '$2a$10$Xntn8VlF7CBjzSHcMCWgbOCWxqN.BqF8mU2SzXnO5NqJd6Jx6dvte',
    'Admin Owner',
    'OWNER'
);
