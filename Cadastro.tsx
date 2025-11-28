import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
} from "react-native";

// Importações de assets (Certifique-se de tê-los na pasta assets)
// Substituí os 'retângulos' por estilos, mas mantive as imagens principais
const image26 = require('./assets/image-26.png'); // Imagem pequena do topo
const robotImage = require('./assets/robot-6654031-640-1.png'); // Robô da parte inferior

// Para ícones, o ideal é usar react-native-vector-icons ou SVGs transformados em componentes.
// Usarei Text/Emoji como placeholder para o ícone de upload.

export const Cadastro = (): React.ReactElement => {
  const [formData, setFormData] = useState({
    username: "",
    login: "",
    password: "",
    email: "",
    profileImage: null as string | null, // No Native, usamos a URI da imagem (string)
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImagePick = async () => {
    // Exemplo de como implementar com expo-image-picker:
    // let result = await ImagePicker.launchImageLibraryAsync({...});
    // if (!result.canceled) { setFormData({...prev, profileImage: result.assets[0].uri}) }
    
    Alert.alert("Upload de Imagem", "Aqui abriria a galeria para selecionar a foto.");
    console.log("Abrir seletor de imagem");
  };

  const handleSubmit = () => {
    console.log("Formulário submetido:", formData);
    // Lógica de envio para API
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      
      {/* --- Cabeçalho Azul Superior --- */}
      <View style={styles.headerContainer}>
        {/* Fundo do cabeçalho (rectangle10.svg convertido em View) */}
        <View style={styles.headerBackground}>
          <Text style={styles.headerTitle}>Cadastro</Text>
          <Image source={image26} style={styles.headerIcon} />
        </View>
      </View>

      {/* --- Área de Upload de Imagem --- */}
      <View style={styles.uploadSection}>
        {/* Título da seção de imagem (fundo 'image.svg' convertido em estilo) */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>Insira uma imagem de Perfil</Text>
        </View>

        {/* Círculo de Imagem / Botão de Upload */}
        <TouchableOpacity onPress={handleImagePick} style={styles.profileImageCircle}>
          {formData.profileImage ? (
            <Image 
              source={{ uri: formData.profileImage }} 
              style={styles.uploadedImage} 
            />
          ) : (
            <View style={styles.uploadPlaceholder}>
              {/* Ícone de upload (vector.svg) placeholder */}
              <Text style={{ fontSize: 24 }}>📷</Text> 
              <Text style={styles.dragText}>Arraste a imagem</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Botão 'Procurar Imagem' */}
        <TouchableOpacity onPress={handleImagePick} style={styles.searchImageButton}>
          <Text style={styles.searchImageButtonText}>Procurar Imagem</Text>
        </TouchableOpacity>
      </View>

      {/* --- Formulário --- */}
      <View style={styles.formContainer}>
        
        {/* Campo: Nome de Usuário */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome de Usuário:</Text>
          <View style={styles.inputWrapper}>
             {/* Simula o 'rectangle28.svg' com estilos */}
            <TextInput
              value={formData.username}
              onChangeText={(text) => handleInputChange("username", text)}
              placeholder="Digite aqui..."
              placeholderTextColor="#979696"
              style={styles.input}
            />
          </View>
        </View>

        {/* Campo: Login */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Login:</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.login}
              onChangeText={(text) => handleInputChange("login", text)}
              placeholder="Digite aqui..."
              placeholderTextColor="#979696"
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Campo: Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha:</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              placeholder="Digite aqui..."
              placeholderTextColor="#979696"
              style={styles.input}
              secureTextEntry
            />
          </View>
        </View>

        {/* Campo: Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              placeholder="Digite aqui..."
              placeholderTextColor="#979696"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Botão Cadastrar */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>

      </View>

      {/* --- Rodapé com Robô --- */}
      <View style={styles.footerContainer}>
        {/* Fundo Azul Inferior */}
        <View style={styles.blueFooterBackground} />

        {/* Imagem do Robô */}
        <Image 
          source={robotImage} 
          style={styles.footerRobot} 
          resizeMode="contain" // Ou 'cover', dependendo de como quer cortar
        />

        {/* Título Final */}
        <Text style={styles.footerTitle}>
          BEM VINDO AO MAKERSPACE
        </Text>
      </View>

    </ScrollView>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 0, // O footer já tem altura suficiente
    minHeight: '100%',
  },
  
  // Header
  headerContainer: {
    width: '100%',
    height: 77,
    marginBottom: 20,
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000048', // Cor extraída do rectangle10.svg presumido ou tema
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    // Ajuste para simular o layout absoluto do original
    justifyContent: 'flex-start',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 60, // Ajuste para 'left-20' relativo
  },
  headerIcon: {
    width: 81,
    height: 42,
    resizeMode: 'contain',
    position: 'absolute',
    left: 5,
    top: 15,
  },

  // Seção de Upload
  uploadSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitleContainer: {
    width: '90%',
    maxWidth: 397,
    height: 48,
    borderWidth: 1, // Borda para simular a caixa image.svg
    borderColor: '#000048', // Cor de borda aproximada
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0', // Fundo leve
  },
  sectionTitleText: {
    color: '#000048',
    fontSize: 20,
    fontWeight: '900', // Black
    fontStyle: 'italic',
  },
  profileImageCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragText: {
    fontSize: 10,
    color: '#000048',
    fontStyle: 'italic',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  searchImageButton: {
    backgroundColor: '#000048',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  searchImageButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    fontStyle: 'italic',
  },

  // Formulário
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Separa label e input
  },
  label: {
    width: '40%', // Ocupa parte esquerda
    color: '#000048',
    fontSize: 18,
    fontWeight: '900', // Black
    fontStyle: 'italic',
  },
  inputWrapper: {
    width: '60%', // Ocupa parte direita
    height: 48,
    backgroundColor: '#f5f5f5', // Simula os retângulos de fundo
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8, // Ajuste para combinar com design
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 10,
    color: '#000048', // Cor do texto digitado
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#000048',
    width: 107,
    height: 31,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end', // Alinha à direita como no design (left: 296px)
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    fontStyle: 'italic',
  },

  // Footer
  footerContainer: {
    position: 'relative',
    height: 320, // Altura suficiente para o fundo e robô
    marginTop: 20,
    alignItems: 'center',
  },
  blueFooterBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 314, // top-[603px] até o fim
    backgroundColor: '#000048',
  },
  footerRobot: {
    position: 'absolute',
    bottom: 0, // Alinhado ao fundo do container azul
    left: 0,
    width: '100%',
    height: 361, // Altura original
    zIndex: 1,
  },
  footerTitle: {
    position: 'absolute',
    bottom: 10, // Ajuste vertical
    color: 'white',
    fontSize: 32, // Levemente menor que 40px para caber melhor mobile
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    zIndex: 2, // Texto sobre o robô/fundo
    width: '80%',
  },
});