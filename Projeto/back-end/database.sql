CREATE DATABASE IF NOT EXISTS desculpas_db;
USE desculpas_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS desculpas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    frase VARCHAR(255) NOT NULL
);

-- Inserindo usuário padrão (senha: 123456)
INSERT INTO usuarios (login, senha, nome) VALUES 
('admin', 'e10adc3949ba59abbe56e057f20f883e', 'Administrador');


INSERT INTO desculpas (frase) VALUES 
('Hoje eu preciso lavar o cabelo.'),
('Meu gato comeu a chave do carro.'),
('Estou esperando uma encomenda muito importante.'),
('meu carro pegou fogo'),
('Minha mãe disse não'),
('tenho trabalho do James');
