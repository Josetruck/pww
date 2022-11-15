#drop database pww
create database pww;
use pww;
create table factions(
    id_faction INT AUTO_INCREMENT,
    faction_name VARCHAR(20) NOT NULL,
    total_distance int(20),
    this_week_distance int(20),
    PRIMARY KEY (id_faction)
);

insert into factions values(null,"Truckers",0,0);
insert into factions values(null,"Bikers",0,0);

create table clans(
    id_clan INT AUTO_INCREMENT,
    clan_name VARCHAR(20) NOT NULL,
    total_distance int(20),
    this_week_distance int(20),
    creation_date date,
    creator varchar(20),
    fk_id_faction int,
    PRIMARY KEY (id_clan),
    FOREIGN KEY (fk_id_faction) references factions(id_faction)
    );
    
create table users(
    id_user INT AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL,
	email varchar(200),
    pass char(32),
    total_distance int(20),
    this_week_distance int(20),
    clan_admin boolean,
    fk_id_clan int,
    fk_id_faction int,
    PRIMARY KEY (id_user),
    FOREIGN KEY (fk_id_faction) references factions(id_faction),
    FOREIGN KEY (fk_id_clan) references clans(id_clan) on delete set null
);

create table weekly_game(
    id_weekly_score INT AUTO_INCREMENT,
    score int(20),
    score_date date,
    fk_id_user int,
    PRIMARY KEY (id_weekly_score),
    FOREIGN KEY (fk_id_user) references users(id_user)
    );
    
create table req_friend(
    id_req INT AUTO_INCREMENT,
    fk_id_from int,
    fk_id_to int,
    req_date date,
    req_status varchar(20),
    PRIMARY KEY (id_req),
    FOREIGN KEY (fk_id_from) references users(id_user),
    FOREIGN KEY (fk_id_to) references users(id_user)
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
    FOREIGN KEY (fk_id_faction) references factions(id_faction),
    FOREIGN KEY (fk_id_clan) references clans(id_clan) on delete set null
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
    FOREIGN KEY (fk_id_faction) references factions(id_faction)
    );
    
