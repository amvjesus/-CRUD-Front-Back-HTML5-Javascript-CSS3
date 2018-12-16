CREATE TABLE IF NOT EXISTS portifolio (
    id_portifolio INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(255) NULL ,
    detalhes TEXT NULL ,
PRIMARY KEY(id_portifolio));

CREATE TABLE IF NOT EXISTS pessoas ( 
     id_pessoa INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
     nome VARCHAR(80) NOT NULL ,
     data DATE NOT NULL,
     documento INTEGER NOT NULL,
     sexo VARCHAR(1) NOT NULL ,
     endereco TEXT(250) NULL ,
PRIMARY KEY(id_pessoa));


