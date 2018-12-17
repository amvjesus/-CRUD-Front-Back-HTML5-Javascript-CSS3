CREATE TABLE IF NOT EXISTS pessoas ( 
     id_pessoa INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
     nome VARCHAR(80) NOT NULL ,
     data DATE NOT NULL,
     documento INTEGER NOT NULL,
     sexo VARCHAR(1) NOT NULL ,
     endereco TEXT(250) NULL ,
PRIMARY KEY(id_pessoa));


