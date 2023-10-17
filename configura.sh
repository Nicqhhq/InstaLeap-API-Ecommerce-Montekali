#!/bin/bash

# Verifica se a pasta "log" não existe e a cria se necessário
if [ ! -d "log" ]; then
    mkdir log
    echo "Pasta 'log' criada com sucesso."
else
    echo "A pasta 'log' já existe."
fi

# Verifica se a pasta "pedidos" não existe e a cria se necessário
if [ ! -d "pedidos" ]; then
    mkdir pedidos
    echo "Pasta 'pedidos' criada com sucesso."
else
    echo "A pasta 'pedidos' já existe."
fi