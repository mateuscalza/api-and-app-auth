CREATE TABLE public."user" (
	id varchar(36) NOT NULL,
	"name" varchar(200) NOT NULL,
	email varchar(200) NOT NULL,
	hash varchar(300) NOT NULL,
	"permission" varchar NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
);
