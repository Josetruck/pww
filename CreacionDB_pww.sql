#drop database pww
create database pww;
use pww;
create table factions(
    id INT AUTO_INCREMENT,
    faction_name VARCHAR(20) NOT NULL,
    total_distance int(20) default 0,
    this_week_distance int(20) default 0,
    PRIMARY KEY (id)
);

insert into factions values(null,"Truckers",0,0);
insert into factions values(null,"Bikers",0,0);

create table clans(
    id INT AUTO_INCREMENT,
    clan_name VARCHAR(20) NOT NULL unique,
    total_distance int(20) default 0,
    this_week_distance int(20) default 0,
    creation_date date DEFAULT (CURRENT_DATE),
    creator varchar(20),
    fk_id_faction int,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_id_faction) references factions(id)
    );
    
create table users(
    id INT AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL unique,
	email varchar(200) unique,
    pass varchar(64),
    total_distance int(20) default 0,
    this_week_distance int(20) default 0,
    clan_admin boolean default 0,
    email_verified boolean default 0,
    fk_id_clan int,
    fk_id_faction int,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_id_faction) references factions(id),
    FOREIGN KEY (fk_id_clan) references clans(id) on delete set null
);

create table weekly_game(
    id INT AUTO_INCREMENT,
    score int(20),
    score_date date default (current_date),
    fk_id_user int,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_id_user) references users(id)
    );
    
create table req_friends(
    id INT AUTO_INCREMENT,
    fk_id_from int,
    fk_id_to int,
    req_date date DEFAULT (CURRENT_DATE),
    req_status varchar(20),
    PRIMARY KEY (id),
    FOREIGN KEY (fk_id_from) references users(id),
    FOREIGN KEY (fk_id_to) references users(id)
    );

    create table req_members(
    id INT AUTO_INCREMENT,
    fk_id_from int,
    fk_id_to int,
    req_date date DEFAULT (CURRENT_DATE),
    req_status varchar(20),
    PRIMARY KEY (id),
    FOREIGN KEY (fk_id_from) references users(id),
    FOREIGN KEY (fk_id_to) references clans(id)
    );
    
    create table deleted_users(
    id int AUTO_INCREMENT,
    old_id_user INT,
    user_name VARCHAR(20) NOT NULL unique,
	email varchar(200) unique,
    pass char(32),
    total_distance int(20),
    clan_admin boolean,
    fk_id_clan int,
    fk_id_faction int,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_id_faction) references factions(id),
    FOREIGN KEY (fk_id_clan) references clans(id) on delete set null
);

create table deleted_clans(
	id int auto_increment,
    old_id_clan INT,
    clan_name VARCHAR(20) NOT NULL,
    total_distance int(20),
    creation_date date,
    creator varchar(20),
    fk_id_faction int,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_id_faction) references factions(id)
    );
    
