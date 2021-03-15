create database PenaltyCalculation
go
use PenaltyCalculation
go

create table Countries(
Id int not null identity(1,1) primary key,
name varchar(255) not null,
CurrencyCode varchar(5) not null,
WeekEnd int not null
)

create table Holidays(
Id int not null identity(1,1) primary key,
HolidayDate date not null,
CountryId int not null
)

Insert into Countries
(name,CurrencyCode,WeekEnd)
values
('US','$',0),
('India','INR',0)

insert into Holidays
(HolidayDate,CountryId)
values
('2021/01/01',1),
('2021/08/15',2),
('2021/01/01',2),
('2021/04/02',2)

select *
from Countries

select * 
from Holidays