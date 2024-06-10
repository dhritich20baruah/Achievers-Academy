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

-- Step 1: Create the table
CREATE TABLE questions (
    id BIGSERIAL NOT NULL PRIMARY KEY,
	testName VARCHAR NOT NULL,
    questionset JSONB
);

-- Step 2: Insert data
INSERT INTO questions (questionset) VALUES (
    '[
        {
            "number": "1",
            "question": "Which of the following is correct about HTML?",
            "options": ["HTML uses User Defined Tags", "HTML uses tags defined within the language", "Both A and B", "None of the above"],
            "status": "notvisited",
            "solution": "HTML uses tags defined within the language",
            "answer": "2",
            "response": "",
            "result": "",
            "section": "HTML"
        },
        {
            "number": "2",
            "question": "How many sizes of headers are available in HTML by default?",
            "options": ["5", "1", "3", "6"],
            "status": "notvisited",
            "solution": "6",
            "answer": "4",
            "response": "",
            "result": "",
            "section": "HTML"
        }
    ]'::jsonb
);

-- Step 3: Query the table
SELECT * FROM questions;
SELECT questionset->0->'question' AS first_question FROM questions;
SELECT * FROM questions
WHERE questionset @> '[{"section": "HTML"}]';
