import React from 'react';
import { Login } from './Login'; // Importa a tela de Login
import { Cadastro } from './Cadastro';
import { Verificacao } from './Verificacao';
import { Feed } from './Feed';
import { Chats } from './Chats';
import  Conversa  from './Conversa';
import { Perfil } from './Perfil';
import { Configuraes } from './Configuracoes';
import { PublicarProjetos } from './Publicar';
import { CriarProjeto } from './CriarProjeto';
import { ConectaMaker } from './ConectaMaker';
import { Conexes } from './Conexoes';

export default function App() {
  return (
    // Renderiza a tela de Login como o componente principal
    <ConectaMaker />
  );
}