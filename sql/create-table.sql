CREATE TABLE contacts (
	contact_id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30),
    last_name VARCHAR(30),
    work_phone VARCHAR(15),
    home_phone VARCHAR(15),
    mobile_phone VARCHAR(15),
    other_phone VARCHAR(15),
    email VARCHAR(60),
    mailing_address VARCHAR(150),
    PRIMARY KEY (contact_id)
);
