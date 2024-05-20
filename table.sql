create table student (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	student_name VARCHAR NOT NULL,
	phone VARCHAR NOT NULL,
	email VARCHAR,
	gender VARCHAR(10) NOT NULL,
	dob DATE,
	course VARCHAR,
    syllabus VARCHAR
);

create table question_set (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	title VARCHAR NOT NULL,
	number VARCHAR NOT NULL,
	question VARCHAR NOT NULL,
	status VARCHAR,
	answer VARCHAR NOT NULL,
	response VARCHAR,
	result VARCHAR
);