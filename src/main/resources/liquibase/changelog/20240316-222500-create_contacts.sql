create table users_contacts
(
    id    serial primary key,
    user1 int not null,
    user2 int not null,
    user2_confirmed boolean not null default false,

    cr_date timestamp   not null,
    cr_user varchar(64) not null,
    up_date timestamp,
    up_user varchar(64),

    constraint fk_user1
        foreign key (user1)
            references users (id)
            on delete restrict,
    constraint fk_user2
        foreign key (user2)
            references users (id)
            on delete restrict
);
