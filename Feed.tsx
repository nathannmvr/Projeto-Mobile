import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
// Para ícones de ações (Curtir, Comentar, Enviar, Busca, Mensagens)
// Recomendamos instalar 'react-native-vector-icons'
import { Ionicons as Icon } from '@expo/vector-icons';

// Definição da largura da tela para estilos responsivos
const { width } = Dimensions.get('window');

// 1. Definição da interface de dados
interface PostData {
  id: number;
  author: string;
  authorImage: any; // Usaremos require() ou URI
  postImage: any;
  description: string;
  // Ícones serão substituídos por nomes de ícones ou componentes
}

// 2. Importação e Mapeamento dos Assets
// IMPORTANTE: Você deve ter estas imagens na pasta 'assets'
const assets = {
  // Avatares
  authorImage1: require('./assets/image-8-3.png'),
  authorImage2: require('./assets/image-8-2.png'),
  authorImage3: require('./assets/image-8.png'),
  // Imagens do Post
  postImage1: require('./assets/2148863383-1.png'),
  postImage2: require('./assets/o-ensino-da-robotica-na-infancia-faz-diferenca-para-a-vida-1.png'),
  postImage3: require('./assets/hq720-1.png'),
  // Ícones do Header e Footer (substituímos por ícones da biblioteca para melhor qualidade)
  robotLogo: require('./assets/robot-6654031-640-2.png'),
};

const postsData: PostData[] = [
  {
    id: 1,
    author: "Ana Júlia",
    authorImage: assets.authorImage1,
    postImage: assets.postImage1,
    description: "Transforme ideias em realidade! Aprenda eletrônica do básico ao avançado e consquiste novas oportunidades. Inscreva-se agora.",
  },
  {
    id: 2,
    author: "Arthur Silva",
    authorImage: assets.authorImage2,
    postImage: assets.postImage2,
    description: "Desperte o engenheiro que há em você! Aprenda a criar e programar robôs do zero com nosso curso de robótica. Inscreva-se e domine o futuro!",
  },
  {
    id: 3,
    author: "Antônio Pedro",
    authorImage: assets.authorImage3,
    postImage: assets.postImage3,
    description: "Dê vida para suas ideias em 3D! Aprenda modelagem 3D do básico oa avançado e transforme criatividade em realidade. Inscreva-se agora!",
  },
];

// --- Componente de Ação (Curtir/Comentar/Enviar) ---
const ActionButton: React.FC<{ label: string; iconName: string }> = ({ label, iconName }) => (
  <TouchableOpacity style={postStyles.actionButton}>
    {/* Ícone (Usando Ionicons, você pode mudar a biblioteca) */}
    <Icon name={iconName} size={24} color="black" />
    <Text style={postStyles.actionText}>{label}</Text>
  </TouchableOpacity>
);

// --- Componente de Post Individual ---
const Post: React.FC<{ post: PostData }> = ({ post }) => {
  return (
    <View style={postStyles.postContainer}>
      {/* Linha de separação superior (substituindo line-1.svg) */}
      <View style={postStyles.topLine} />

      {/* Cabeçalho do Post (Autor e Imagem do Perfil) */}
      <View style={postStyles.postHeader}>
        <Image 
          source={post.authorImage} 
          style={postStyles.authorImage} 
          resizeMode="cover" 
        />
        <Text style={postStyles.authorName}>{post.author}</Text>
      </View>

      {/* Imagem da Postagem */}
      <Image 
        source={post.postImage} 
        style={postStyles.postImage} 
        resizeMode="cover" 
      />

      {/* Descrição */}
      <View style={postStyles.descriptionContainer}>
        <Text style={postStyles.descriptionText}>
          <Text style={postStyles.authorNameInDescription}>{post.author} - </Text>
          <Text style={postStyles.descriptionContent}>{post.description}</Text>
        </Text>
      </View>

      {/* Botões de Ação (Curtir, Comentar, Enviar) */}
      <View style={postStyles.actionRow}>
        <ActionButton label="Curtir" iconName="heart-outline" />
        <ActionButton label="Comentar" iconName="chatbubble-outline" />
        <ActionButton label="Enviar" iconName="share-outline" />
      </View>

      {/* Linha de separação inferior (substituindo line-1-3.svg) */}
      <View style={postStyles.bottomLine} />
    </View>
  );
};

// --- Tela Principal do Feed ---
export const Feed = (): React.ReactElement => {
  // Render Item para FlatList
  const renderPost = ({ item }: { item: PostData }) => <Post post={item} />;

  return (
    <View style={styles.container}>
      
      {/* --- HEADER (FIXO NO TOPO) --- */}
      <View style={styles.header}>
        {/* Logo (Robô) */}
        <Image source={assets.robotLogo} style={styles.logo} resizeMode="contain" />
        
        {/* Campo de Busca */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder=""
            placeholderTextColor="#999"
          />
          {/* Ícone de Busca */}
          <Icon name="search-outline" size={21} color="#333" style={styles.searchIcon} />
        </View>

        {/* Botão de Mensagens */}
        <TouchableOpacity style={styles.messageButton}>
          {/* Ícone de Mensagem (icons8SpeechBubble501) */}
          <Icon name="chatbubble-ellipses-outline" size={30} color="#000048" />
        </TouchableOpacity>
      </View>

      {/* --- FEED DE POSTAGENS (SCROLLABLE) --- */}
      <FlatList
        data={postsData}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.feedList}
        // O `marginTop: 86` é substituído pelo padding superior do FlatList para evitar sobreposição
      />

      {/* --- FOOTER/NAV BAR (FIXO NA PARTE INFERIOR) --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="home-outline" size={30} color="white" />
          {/* <Image source={image35} style={styles.navIcon} /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="compass-outline" size={30} color="white" />
          {/* <Image source={image7} style={styles.navIcon} /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="location-outline" size={30} color="white" />
          {/* <Image source={image34} style={styles.navIcon} /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="person-outline" size={30} color="white" />
          {/* <Image source={image5} style={styles.navIcon} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Estilos Globais do Feed ---
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
    height: 86,
    backgroundColor: 'white', // rectangle5.svg (Assumindo um fundo claro)
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 30, // Espaço para barra de status
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    width: 73,
    height: 50, // Ajustado para caber no header
    marginLeft: 0,
  },
  searchBarContainer: {
    flex: 1,
    height: 33,
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    paddingRight: 10,
  },
  messageButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Lista de Posts (FlatList)
  feedList: {
    paddingTop: 86, // Cria o espaço necessário para o Header fixo
    paddingBottom: 82, // Cria o espaço necessário para o Footer fixo
    paddingHorizontal: 10,
  },

  // Footer Fixo (Navigation Bar)
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 82,
    backgroundColor: '#000048',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    padding: 5,
  },
  // navIcon: { ... }, // Estilos para ícones do footer, se forem imagens
});

// --- Estilos do Componente Post ---
const postStyles = StyleSheet.create({
  postContainer: {
    // Equivalente a w-[427px] h-[499px]
    width: width - 20, // Largura total do feed menos paddingHorizontal
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  topLine: {
    // Linha de separação entre posts
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  bottomLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    marginTop: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  authorImage: {
    width: 49,
    height: 47,
    borderRadius: 25, // Para ser circular
    marginRight: 10,
  },
  authorName: {
    // Inter-BlackItalic, text-xl, text-black
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    color: 'black',
  },
  postImage: {
    // w-[378px] h-[332px]
    width: '90%',
    height: 330,
    alignSelf: 'center',
    borderRadius: 4,
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  descriptionText: {
    fontSize: 11,
    color: 'black',
    lineHeight: 14,
  },
  authorNameInDescription: {
    // Inter-BlackItalic, font-black italic
    fontWeight: '900',
    fontStyle: 'italic',
  },
  descriptionContent: {
    // Inter-SemiBold_Italic, font-semibold italic
    fontWeight: '600',
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    // Inter-SemiBold_Italic, text-[15px]
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'black',
    marginLeft: 5,
  },
});