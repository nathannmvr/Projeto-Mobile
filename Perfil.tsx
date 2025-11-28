import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons as Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// 1. Mapeamento de Assets (Requer que os arquivos estejam na pasta assets)
const assets = {
  // Header
  logo: require('./assets/image-26.png'), // Logo
  settingsIcon: require('./assets/image-24.png'), // Ícone de configurações/edição
  searchIcon: require('./assets/image.png'), // Ícone de busca (se for o caso)

  // Perfil Info
  profileAvatar: require('./assets/image-8.png'), // Avatar do usuário
  coverImage: require('./assets/2148863383-1.png'), // Imagem de fundo/capa

  // Galeria de Projetos (Exemplos)
  postImage1: require('./assets/2148863383-1.png'), // Post 1
  postImage2: require('./assets/espacomaker-1.png'), // Post 2
  postImage3: require('./assets/IMG-4331-1.png'), // Post 3
  postImage4: require('./assets/oficina-de-eletronica-no-ensino-medio-02-1.png'), // Post 4
  // ... continue mapeando as outras 8 imagens de projeto conforme necessário
};

// Dados da Galeria (apenas as primeiras 6 para demonstração do layout)
const projectGallery = [
  { id: 1, image: assets.postImage1 },
  { id: 2, image: assets.postImage2 },
  { id: 3, image: assets.postImage3 },
  { id: 4, image: assets.postImage4 },
];

// --- Componente de Item da Galeria ---
const GalleryItem: React.FC<{ image: any }> = ({ image }) => (
  <TouchableOpacity style={galleryStyles.itemContainer}>
    <Image 
      source={image} 
      style={galleryStyles.image} 
      resizeMode="cover" 
    />
  </TouchableOpacity>
);

export const Perfil: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* --- HEADER (FIXO) --- */}
      <View style={styles.header}>
        {/* Fundo do Header (Retângulo) */}
        <View style={styles.headerBackground} /> 
        <View style={styles.headerContent}>
          {/* Logo (image26) */}
          <Image source={assets.logo} style={styles.logo} resizeMode="contain" />
          
          {/* Título centralizado (posição absoluta para garantir centralização) */}
          <Text style={styles.headerTitle}>Perfil</Text>
          
          {/* Ícone de Configurações/Edição (image24) */}
          <TouchableOpacity style={styles.settingsButton} onPress={() => console.log('Configurações')}>
            <Image source={assets.settingsIcon} style={styles.settingsIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- CONTEÚDO SCROLLABLE (Perfil + Galeria) --- */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          
          {/* Avatar e Infos Básicas */}
          <View style={styles.bioContainer}>
            <Image source={assets.profileAvatar} style={styles.avatar} resizeMode="cover" />
            <View style={styles.bioText}>
              <Text style={styles.nameText}>Ana Júlia</Text>
              <Text style={styles.usernameText}>@anajulia</Text>
            </View>
          </View>

          {/* Imagem de Capa (image.png) */}
          <Image source={assets.coverImage} style={styles.coverImage} resizeMode="cover" />
          
          {/* Estatísticas (Projetos e Conexões) */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statCount}>10</Text>
              <Text style={styles.statLabel}>Projetos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statCount}>200</Text>
              <Text style={styles.statLabel}>Conexões</Text>
            </View>
          </View>
        </View>

        {/* --- Galeria de Projetos --- */}
        <View style={styles.galleryHeader}>
          <Text style={styles.galleryTitle}>Galeria de Projetos</Text>
          {/* Ícones de ordenação/filtro */}
          <View style={styles.galleryIcons}>
            <TouchableOpacity style={{ padding: 5 }}><Ionicons name="grid-outline" size={24} color="black" /></TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }}><Ionicons name="list-outline" size={24} color="black" /></TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.galleryContainer}>
            {projectGallery.map((item) => (
                <GalleryItem key={item.id} image={item.image} />
            ))}
        </View>

      </ScrollView>

      {/* --- FOOTER/NAV BAR (FIXO NA PARTE INFERIOR) --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Home')}>
            <Ionicons name="home-outline" size={30} color="white" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Explorar')}>
            <Ionicons name="compass-outline" size={30} color="white" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Localização')}>
            <Ionicons name="location-outline" size={30} color="white" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Chat')}>
            <Ionicons name="chatbubble-outline" size={30} color="white" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Mais')}>
            <Ionicons name="ellipsis-horizontal-circle-outline" size={30} color="white" /> 
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Perfil;

// --- Estilos da Galeria ---
const ITEM_MARGIN = 5;
const NUM_COLUMNS = 3;
// Calcula a largura de cada item para garantir que 3 caibam, considerando margens
const ITEM_WIDTH = (width / NUM_COLUMNS) - (ITEM_MARGIN * 2);

const galleryStyles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH, // Altura igual à largura para quadrado
    margin: ITEM_MARGIN,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});


// --- Estilos Globais da Tela ---
const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 85;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  // Header Fixo
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingHorizontal: 15,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#000048',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  logo: {
    width: 81,
    height: 42,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 5,
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  
  // ScrollView (Conteúdo)
  scrollView: {
    flex: 1,
    marginTop: HEADER_HEIGHT,
  },
  scrollContent: {
    paddingBottom: FOOTER_HEIGHT, // Espaço para o footer fixo
  },

  // Perfil Superior
  profileSection: {
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  bioText: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    color: 'black',
  },
  usernameText: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'black',
  },
  coverImage: {
    width: width * 0.95,
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statCount: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'black',
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'black',
  },

  // Galeria de Projetos
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
  galleryTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'black',
  },
  galleryIcons: {
    flexDirection: 'row',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  
  // Footer Fixo (Navigation Bar)
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT,
    backgroundColor: '#000048',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 5,
  },
  navButton: {
    padding: 5,
  },
});