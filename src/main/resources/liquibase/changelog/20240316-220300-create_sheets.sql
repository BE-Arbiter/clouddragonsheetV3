create table sheets
(
    id      serial primary key,
    owner   int         not null,

    game    varchar(64) not null,
    data    text        not null default '',

    cr_date timestamp   not null,
    cr_user varchar(64) not null,
    up_date timestamp,
    up_user varchar(64),

    constraint fk_owner
        foreign key (owner)
            references users (id)
            on delete restrict
);

create table sheets_access
(
    id       serial primary key,
    "user"   int not null,
    sheet    int not null,
    readonly boolean default true,
    constraint fk_user
        foreign key ("user")
            references users (id)
            on delete restrict,
    constraint fk_sheet
        foreign key (sheet)
            references sheets (id)
            on delete restrict
);

create table sheets_public_access
(
    id    serial primary key,
    token varchar(255) not null unique,
    sheet int          not null,
    constraint fk_sheet
        foreign key (sheet)
            references sheets (id)
            on delete restrict
)