import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
// Importação de ícones (Você precisará instalar a biblioteca 'react-native-vector-icons')
// Exemplo: import Icon from 'react-native-vector-icons/Feather';

// 1. Definição da largura da tela para estilos responsivos
const { width, height } = Dimensions.get('window');

// 2. Importação dos assets
// No Native, a importação é feita via require() e as imagens devem estar
// na pasta assets ou importadas via URI.
// Usaremos um placeholder para o robô, pois o caminho original é relativo.
const robotImage = require('./assets/robot-6654031-640-1.png'); // OBS: Adicione este arquivo na pasta 'assets'

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aqui irá a lógica de autenticação
    console.log("Tentativa de Login:", { email, password });
    // Navegação para a próxima tela...
  };

  const handleGoogleLogin = () => {
    // Lógica para login com Google
    console.log("Login com Google clicado");
  };

  const handleCreateAccount = () => {
    console.log("Criar conta clicado");
    // Lógica de navegação para a tela de cadastro
  };

  const handleForgotPassword = () => {
    console.log("Esqueceu a senha clicado");
    // Lógica de navegação para a tela de recuperação
  };

  return (
    // View principal. O flex: 1 garante que a View ocupe toda a tela.
    <View style={styles.container}>
      
      {/* Background Azul Escuro (Substitui a div grande e absoluta) */}
      <View style={styles.blueBackground} />

      {/* Conteúdo Principal (Centralizado) */}
      <View style={styles.contentWrapper}>
        
        {/* Título */}
        <Text style={styles.title}>
          BEM VINDO AO MAKERSPACE
        </Text>

        {/* Imagem do Robô */}
        <Image
          source={robotImage}
          style={styles.robotImage}
          // Usando um fallback caso a imagem não carregue
          onError={() => console.log('Erro ao carregar imagem do robô')} 
          accessibilityLabel="Mascote robô dando as boas-vindas ao Makerspace"
        />

        {/* Campo de Email */}
        <View style={[styles.inputContainer, { marginTop: email ? 0 : 380 }]}>
          <View style={styles.iconPlaceholder}>
            {/* Ícone de Email - SUBSTITUA POR UM ÍCONE REAL (ex: <Icon name="mail" size={24} color="#9c9393" />) */}
            <Text style={styles.iconText}>📧</Text>
          </View>
          <TextInput
            style={styles.inputField}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#9c9393"
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            accessibilityLabel="Endereço de email"
          />
        </View>

        {/* Campo de Senha */}
        <View style={styles.inputContainer}>
          <View style={styles.iconPlaceholder}>
            {/* Ícone de Senha - SUBSTITUA POR UM ÍCONE REAL */}
            <Text style={styles.iconText}>🔒</Text>
          </View>
          <TextInput
            style={styles.inputField}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#979696"
            secureTextEntry
            textContentType="password"
            accessibilityLabel="Senha"
          />
        </View>

        {/* Opções de Conta (Criar e Esqueceu Senha) */}
        <View style={styles.linkGroup}>
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={styles.linkText}>
              Criar conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão LOGIN */}
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          activeOpacity={0.8}
          accessibilityLabel="Fazer Login"
        >
          <Text style={styles.loginButtonText}>
            LOGIN
          </Text>
        </TouchableOpacity>

        {/* Botão Fazer Login com Google */}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={styles.googleButton}
          activeOpacity={0.7}
          accessibilityLabel="Fazer Login com Google"
        >
          {/* Ícone Google - Substituí por um emoji, mas você deve usar um Icon ou SVG */}
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.googleButtonText}>
            Fazer Login
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

// --- Estilos React Native ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  // O background azul é mantido absoluto para preencher a parte superior
  blueBackground: {
    position: 'absolute',
    top: -64, // -top-16 (Ajuste para o topo)
    left: -22,
    width: width + 44, // Garante que preencha a largura
    height: 634,
    backgroundColor: '#000048',
  },
  contentWrapper: {
    // Centraliza o conteúdo abaixo do background azul
    width: '100%',
    maxWidth: 412,
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative', // Para que os elementos sejam posicionados em relação a este wrapper
  },
  title: {
    // Inter-BlackItalic, text-[40px], text-white
    marginTop: 138,
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    // No Native, fontes italic/bold personalizadas podem exigir configuração de assets,
    // mas usaremos 'italic' e 'black' (900) para simular.
    fontStyle: 'italic', 
    fontWeight: '900', 
    width: '80%',
    lineHeight: 45,
    marginBottom: 20,
  },
  robotImage: {
    // w-[412px] h-[420px] object-cover
    width: width * 0.9, // Usa 90% da largura da tela
    height: 420,
    resizeMode: 'contain',
    position: 'absolute',
    top: 192, // Posição de top 48px abaixo do título aproximadamente
    left: 0,
    right: 0,
    zIndex: 1,
  },
  // --- Inputs ---
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 235, // Largura fixa do design original
    height: 56, // h-14
    backgroundColor: '#d9d9d9',
    borderRadius: 15,
    marginBottom: 23,
    // marginTop será definido dinamicamente no componente
    zIndex: 10,
  },
  inputField: {
    flex: 1,
    height: '100%',
    paddingLeft: 50, // Espaço para o ícone
    fontSize: 14,
    fontWeight: '600',
    color: '#000048',
  },
  iconPlaceholder: {
    position: 'absolute',
    left: 12, // Posição do ícone
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
  },
  iconText: {
    fontSize: 20,
  },
  // --- Links ---
  linkGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 235,
    marginTop: 10,
    marginBottom: 25,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000048',
    textDecorationLine: 'underline',
  },
  // --- Botão Login Principal ---
  loginButton: {
    // w-[173px] h-[49px] bg-[#3318e8] rounded-[15px]
    width: 173,
    height: 49,
    backgroundColor: '#3318e8',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    // Inter-BlackItalic, text-white, text-xl
    fontSize: 20,
    color: 'white',
    fontWeight: '900',
    fontStyle: 'italic',
  },
  // --- Botão Google ---
  googleButton: {
    // w-[115px] h-[38px] flex bg-white rounded-[5px] border border-solid border-[#000048]
    flexDirection: 'row',
    width: 115,
    height: 38,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000048',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  googleIcon: {
    // Placeholder para o ícone complexo SVG
    fontSize: 20,
    color: '#000048',
    marginRight: 5,
  },
  googleButtonText: {
    // Inter-SemiBold, text-[#000048], text-[10px]
    fontSize: 10,
    fontWeight: '600',
    color: '#000048',
  }
});