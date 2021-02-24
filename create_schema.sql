CREATE TABLE `Events` (
	`eventID` int NOT NULL AUTO_INCREMENT,
	`organizerID` varchar(150) NOT NULL,
	`name` varchar(150) NOT NULL,
	`description` TEXT(500) NOT NULL,
	`date` DATE NOT NULL,
	`published` BOOLEAN NOT NULL,
	PRIMARY KEY (`eventID`)
);

CREATE TABLE `Projects` (
	`projectID` int NOT NULL AUTO_INCREMENT,
	`studentID` bit NOT NULL,
	`teacherID` int NOT NULL,
	`sphereID` varchar(50) NOT NULL,
	`documentID` int NOT NULL,
	`name` varchar(150) NOT NULL,
	`description` TEXT NOT NULL,
	`start_date` DATE NOT NULL,
	`finished` BOOLEAN NOT NULL,
	PRIMARY KEY (`projectID`)
);

CREATE TABLE `Students` (
	`studentID` int NOT NULL AUTO_INCREMENT,
	`gradeID` int NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`middle_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`study_lang` varchar(10) NOT NULL,
	PRIMARY KEY (`studentID`)
);

CREATE TABLE `Teachers` (
	`teacherID` int NOT NULL AUTO_INCREMENT,
	`subjectID` int NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`middle_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`phone` varchar(255) NOT NULL,
	PRIMARY KEY (`teacherID`)
);

CREATE TABLE `Winners` (
	`eventID` int NOT NULL,
	`projectID` int NOT NULL,
	`place` int NOT NULL
);

CREATE TABLE `Users` (
	`userID` int NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`role` int(5) NOT NULL,
	PRIMARY KEY (`userID`)
);

CREATE TABLE `Subjects` (
	`subjectID` int NOT NULL AUTO_INCREMENT,
	`name` varchar(50) NOT NULL,
	PRIMARY KEY (`subjectID`)
);

CREATE TABLE `Grades` (
	`gradeID` int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`gradeID`)
);

CREATE TABLE `Speheres` (
	`sphereID` int NOT NULL AUTO_INCREMENT,
	`sphere_name` varchar(255) NOT NULL,
	PRIMARY KEY (`sphereID`)
);

CREATE TABLE `Organizations` (
	`organizerID` int NOT NULL AUTO_INCREMENT,
	`organizer_name` int NOT NULL,
	PRIMARY KEY (`organizerID`)
);

CREATE TABLE `Documents` (
	`documentID` int NOT NULL AUTO_INCREMENT,
	`document_link` varchar(255) NOT NULL,
	`document_name` varchar(255) NOT NULL,
	PRIMARY KEY (`documentID`)
);

ALTER TABLE `Events` ADD CONSTRAINT `Events_fk0` FOREIGN KEY (`organizerID`) REFERENCES `Organizations`(`organizerID`);

ALTER TABLE `Projects` ADD CONSTRAINT `Projects_fk0` FOREIGN KEY (`studentID`) REFERENCES `Students`(`studentID`);

ALTER TABLE `Projects` ADD CONSTRAINT `Projects_fk1` FOREIGN KEY (`teacherID`) REFERENCES `Teachers`(`teacherID`);

ALTER TABLE `Projects` ADD CONSTRAINT `Projects_fk2` FOREIGN KEY (`sphereID`) REFERENCES `Speheres`(`sphereID`);

ALTER TABLE `Projects` ADD CONSTRAINT `Projects_fk3` FOREIGN KEY (`documentID`) REFERENCES `Documents`(`documentID`);

ALTER TABLE `Teachers` ADD CONSTRAINT `Teachers_fk0` FOREIGN KEY (`subjectID`) REFERENCES `Subjects`(`subjectID`);

ALTER TABLE `Winners` ADD CONSTRAINT `Winners_fk0` FOREIGN KEY (`eventID`) REFERENCES `Events`(`eventID`);

ALTER TABLE `Winners` ADD CONSTRAINT `Winners_fk1` FOREIGN KEY (`projectID`) REFERENCES `Projects`(`projectID`);

