create table users (
    id serial primary key,
    email varchar(64) not null,
    username varchar(64) not null,
    password varchar(255) not null,
    first_name varchar(64) not null,
    last_name varchar(64) not null,
    roles varchar(255) not null default 'ROLE_USER',

    activated boolean not null default false,
    activation_code varchar(255) unique,

    cr_date timestamp not null,
    cr_user varchar(64) not null,
    up_date timestamp,
    up_user varchar(64)
);

insert into users(email,username,password,first_name,last_name,roles,activated,cr_date,cr_user)
values ('lambertda@hotmail.com','admin','$2a$10$DP0FEuZfbSwC/u1hme0OqO1n297Clis3JcmUNqIN.pJr90PZ0S2lm','David','Lambert','ROLE_USER,ROLE_ADMIN',true,now(),'liquibase');
