// CREATE TABLE user_details(
// 	USER_ID	BIGINT PRIMARY KEY ,
// 	USER_NAME VARCHAR(100),
// 	CONTACT_NUMBER BIGINT ,
// 	HASHED_PASSWORD VARCHAR,
// 	ENCRYPTED_PASSWORD VARCHAR,
// 	CREATED_DATE_TIME TIMESTAMP
// );

// select * from user_details where contact_number = 8088638336

// insert into user_details(user_id, user_name, contact_number, hashed_password, encrypted_password, created_date_time)
// values(1234567890, 'chets', 8088638336, '123456987', '1234567098','2022-01-14 10:10:10')

// DELETE FROM user_details
// WHERE contact_number = 8088638336;

// CREATE TABLE customer_details(
// 	Customer_Id	BIGINT PRIMARY KEY ,
// 	Cust_Name VARCHAR(100),
// 	City VARCHAR(100) ,
// 	Grade INT,
// 	Salesman_Id BIGINT REFERENCES salesman_details(Salesman_Id) ON DELETE CASCADE
// );

// select * from customer_details

// insert into customer_details(Customer_Id, Cust_Name, City, Grade, Salesman_Id)
// values(3002, 'Nick Rimando', 'New york', 100, 5001),
// 	  (3007, 'Brad Davis', 'New york', 200, 5001),
// 	  (3005, 'Graham Zusi', 'California', 200, 5002),
// 	  (3008, 'Julian Green', 'London', 300, 5002),
// 	  (3004, 'Fabian Johnson', 'Paris', 300, 5006),
// 	  (3009, 'Geoff Cameron', 'Berlin', 100, 5003),
// 	  (3003, 'Jozy Altidor', 'Moscow', 200, 5007),
// 	  (3001, 'Brad Guzan', 'London', null, 5005);

// CREATE TABLE salesman_details(
// 	Salesman_Id	BIGINT PRIMARY KEY ,
// 	Salesman_Name VARCHAR(100),
// 	City VARCHAR(100) ,
// 	Commission FLOAT
// );

// select * from salesman_details

// insert into salesman_details(Salesman_Id, Salesman_Name, City, Commission)
// values(5001, 'James Hoog', 'New york', 0.15),
// 	  (5002, 'Nail Knite', 'Paris', 0.13),
// 	  (5005, 'Pit Alex', 'London', 0.11),
// 	  (5006, 'Mc lyon', 'Paris', 0.14),
// 	  (5007, 'Paul Adam', 'Rome', 0.13),
// 	  (5003, 'Lauson Hen', 'San Jose', 0.12);

// select cd.Customer_Id, cd.Cust_Name, cd.City as customer_city, cd.Grade, cd.Salesman_Id, sd.Salesman_Name, sd.City as salesman_city, sd.Commission from customer_details cd
// join salesman_details sd on cd.Salesman_Id = sd.Salesman_Id
// where sd.Commission > 0.12
