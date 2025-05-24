CREATE TABLE Roles (
    TranId SERIAL PRIMARY KEY,
    Roll VARCHAR(50) UNIQUE NOT NULL
);


-- insert into roles(Roll) values('Admin');
-- insert into roles(Roll) values('Manager');
-- insert into roles(Roll) values('guest');


CREATE TABLE Userlist (
  UserId SERIAL PRIMARY KEY,
  UserName VARCHAR(100),
  Email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  RollId Numeric(10,0) DEFAULT 3,
  AccessToken Varchar(500) ,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- insert into Userlist(UserName,Email,password,RollId) values('Prince','princejebastin27@gmail.com','Prince@1234',1)

