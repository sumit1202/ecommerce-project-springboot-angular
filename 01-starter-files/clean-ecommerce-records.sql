use `full-stack-ecommerce`;

-- clean up record for all tables
set FOREIGN_KEY_CHECKS=0;

truncate customer;
truncate orders;
truncate address;
truncate order_item;

set FOREIGN_KEY_CHECKS=1;

-- make email unique
alter table customer add unique(email);
