create table mechanic
(
    id          uuid         not null
        primary key,
    firstname   varchar(255) not null,
    lastname    varchar(255) not null,
    email       varchar(255) not null,
    mobilephone varchar(255) not null
        unique,
    dni         varchar(255) not null
        unique,
    speciality  varchar(255) not null
);



create table category
(
    id   uuid         not null
        primary key,
    name varchar(255) not null
);


create table product
(
    id            uuid           not null
        primary key,
    name          varchar(255)   not null,
    description   varchar(500),
    purchaseprice numeric(12, 3) not null
        constraint purchasepriceconst
            check (purchaseprice >= (0)::numeric),
    saleprice     numeric(12, 3) not null
        constraint salepriceconst
            check (saleprice >= (0)::numeric),
    stock         integer        not null
        constraint greater_than_zero
            check (stock >= 0),
    id_category   uuid
        constraint id_cat
            references public.category
);



create table customer
(
    id          uuid         not null
        primary key,
    firstname   varchar(255) not null,
    lastname    varchar(255) not null,
    email       varchar(255) not null,
    mobilephone varchar(255) not null
        unique,
    dni         varchar(255) not null
        unique
);


create table vehicule
(
    id                uuid         not null
        primary key,
    plate             varchar(255) not null
        unique,
    brand             varchar(255) not null,
    model             varchar(255) not null,
    manufacturingyear integer      not null,
    mileage           integer      not null,
    color             varchar(255) not null,
    id_customer       uuid
        constraint fk_constraint
            references public.customer
);



create table user_auth
(
    id           uuid         not null
        primary key,
    email        varchar(255) not null
        unique,
    passwordhash varchar(255) not null,
    name         varchar(255) not null,
    rola         varchar(255) not null
);



create table service
(
    id          uuid         not null
        primary key,
    name        varchar(255) not null,
    description varchar(255) not null,
    laborprice  numeric(12, 3)
);



create table quote
(
    id           uuid           not null
        primary key,
    id_vehicle   uuid           not null
        constraint constraint_vehicle
            references public.vehicule,
    status       varchar(255)   not null,
    totalamount  numeric(12, 3) not null,
    creationdate timestamp      not null
);


create table service_detail
(
    id                uuid           not null
        primary key,
    appliedlaborprice numeric(12, 3) not null,
    id_service        uuid
        references public.service,
    id_quote          uuid
        constraint foreign_key_qoute
            references public.quote
);



create table product_detail
(
    id           uuid           not null
        primary key,
    quantity     integer        not null,
    appliedprice numeric(12, 3) not null
        constraint price_const
            check (appliedprice >= (0)::numeric),
    id_product   uuid
        constraint fk_const
            references public.product,
    id_quote     uuid
        constraint foreign_key_qoute
            references public.quote
);



create table service_order
(
    id           uuid         not null
        primary key,
    id_quote     uuid         not null
        constraint quote_fk
            references public.quote,
    orderstatus  varchar(255) not null,
    creationdate timestamp    not null
);



create table task
(
    id                uuid         not null
        primary key,
    id_mechanic       uuid         not null
        constraint fk__mechanic
            references public.mechanic,
    id_service_detail uuid         not null
        constraint fk_service_detail
            references public.service_detail,
    status            varchar(255) not null,
    creationdate      timestamp    not null,
    finisheddate      timestamp,
    id_service_order  uuid
        constraint fk_service_order
            references public.service_order
);



create table payment
(
    id               uuid           not null
        primary key,
    amounttopay      numeric(12, 3) not null,
    amountreceived   numeric(12, 3) not null,
    date             timestamp      not null,
    paymentmethod    varchar(255)   not null,
    id_service_order uuid           not null
        constraint fk_service_order
            references public.service_order
);



