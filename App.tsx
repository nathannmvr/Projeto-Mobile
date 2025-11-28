import React from 'react';
import { Login } from './Login'; // Importa a tela de Login
import { Cadastro } from './Cadastro';
import { Verificacao } from './Verificacao';
import { Feed } from './Feed';
import { Chats } from './Chats';

export default function App() {
  return (
    // Renderiza a tela de Login como o componente principal
    <Login />
  );
}