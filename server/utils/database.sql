CREATE TABLE public."user" (
	id varchar(36) NOT NULL,
	"name" varchar(200) NOT NULL,
	email varchar(200) NOT NULL,
	hash varchar(300) NOT NULL,
	"permission" varchar NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE public.post (
	id varchar(36) NOT NULL,
	title varchar(200) NOT NULL,
	body text NOT NULL,
	author_id varchar(36) NOT NULL,
	CONSTRAINT post_pk PRIMARY KEY (id),
	CONSTRAINT post_fk FOREIGN KEY (author_id) REFERENCES public."user"(id)
);
