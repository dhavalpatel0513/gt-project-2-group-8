DROP DATABASE IF EXISTS listing_db;
CREATE DATABASE listing_db;
USE listing_db;

CREATE TABLE cityhouses (
        id NOT NULL AUTO_INCREMENT,
    "state" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "sub-region" VARCHAR(255) NOT NULL,
     price  INT(11) NOT NULL,
    lattitude INT(20) NOT NULL,
    longitude INT(20) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO cityhouses (
    id, "state", "city", "sub-region", price, lattitude, longitude
) VALUES ("1", "GA", "Atlanta", "Midtown", "216900", "33.786845", "-84.379061" ), ("2", "GA", "ATLANTA", "DOWNTOWN", "149100", "33.758149", "-84.391189"), ("3", "GA", "ATLANTA", "OLD FOURTH WARD", "165400", "33.762616", "-84.37087"), ("4", "GA", "ATLANTA", "NORTH-BUCKHEAD", "445800", "33.862514", "-84.370276"), ("5", "GA", "ATLANTA", "MORNINGSIDE-LENOX", "639900", "33.79931", "-84.354282"), ("6", "GA", "ATLANTA", "PINE-HILLS", "176000", "33.838075", "-84.354677"), ("7", "GA", "ATLANTA", "GRANT-PARK", "282800", "33.737848", "-84.369825"), ("8", "GA", "ATLANTA", "HOME-PARK", "247100", "33.784857", "-84.403576"), ("9", "GA", "ATLANTA", "VIRGINIA-HIGHLANDS", "564600", "33.780788", "-84.357923"), ("10", "GA", "ATLANTA", "KIRKWOOD", "253000", "33.752577", "-84.324778");
