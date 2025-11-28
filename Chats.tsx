import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
// Importando ícones (necessita da instalação: react-native-vector-icons)
import { Ionicons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// 1. Definição da interface e dos dados
interface ChatItemData {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: any; // Usamos 'any' para aceitar o require() ou URI
}

// Assumindo que 'image.png' seja o avatar do Júlio César
const avatarJulioCesar = require('./assets/image.png');
// Ícones de navegação e busca (substituídos por vetores ou placeholders)
const backIcon = require('./assets/image-34.png'); // Imagem de navegação de volta
// image36 (Ícone de busca) foi substituído por Icon name="search-outline"

const chatData: ChatItemData[] = [
  {
    id: 1,
    name: "Júlio César",
    message: "Aaah, que bom...",
    time: "2:40PM",
    avatar: avatarJulioCesar,
  },
  {
    id: 2,
    name: "Arthur Silva",
    message: "O projeto está quase pronto!",
    time: "1:15PM",
    avatar: avatarJulioCesar, // Placeholder
  },
  {
    id: 3,
    name: "Ana Júlia",
    message: "Me encontre no Makerspace.",
    time: "Ontem",
    avatar: avatarJulioCesar, // Placeholder
  },
];


// --- Componente de Item de Chat ---
const ChatItemComponent: React.FC<{ chat: ChatItemData }> = ({ chat }) => (
  <TouchableOpacity style={itemStyles.itemContainer}>
    {/* Avatar */}
    <Image 
      source={chat.avatar} 
      style={itemStyles.avatar} 
      resizeMode="cover" 
    />

    {/* Conteúdo (Nome e Mensagem) */}
    <View style={itemStyles.content}>
      <Text style={itemStyles.name}>{chat.name}</Text>
      <Text style={itemStyles.message}>{chat.message}</Text>
    </View>
    
    {/* Horário */}
    <Text style={itemStyles.time}>{chat.time}</Text>
  </TouchableOpacity>
);


// --- Tela Principal de Chats ---
export const Chats: React.FC = () => {
  
  // Render Item para FlatList
  const renderItem = ({ item }: { item: ChatItemData }) => (
    <ChatItemComponent chat={item} />
  );

  return (
    <View style={styles.container}>
      
      {/* --- HEADER (Fixo) --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Botão de Retorno (image34) */}
          <TouchableOpacity style={styles.backButton} onPress={() => console.log('Voltar')}>
            <Image source={backIcon} style={styles.backIcon} resizeMode="cover" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chats</Text>
        </View>

        {/* Campo de Busca */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder=""
            placeholderTextColor="#999"
          />
          {/* Botão de Busca (image36) */}
          <TouchableOpacity style={styles.searchButton} onPress={() => console.log('Buscar')}>
             <Icon name="search-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- LISTA DE CHATS (Scrollable) --- */}
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />

      {/* --- Elementos de rodapé (div e footer azul) --- */}
      {/* Estes elementos parecem ser decorativos no design original e serão ignorados
          ou simulados por elementos simples na parte inferior da tela */}
      <View style={styles.decorativeFooter} />
      <View style={styles.absoluteFooter} />

    </View>
  );
};

// --- Estilos Globais da Tela ---
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
    height: 82 + (Platform.OS === 'ios' ? 20 : 0), // Adiciona padding para iOS status bar
    backgroundColor: '#000048',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 40 : 10, // Ajuste para status bar
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 30,
  },
  backIcon: {
    width: 30, // Reduzido de 81px para melhor visualização mobile
    height: 30,
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    // Alinhamento à direita e largura fixa do design
    width: width * 0.5, 
    height: 33,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginRight: 5,
    // Adicionando sombra para simular shadow-[inset_0px_4px_4px_#00000040]
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    paddingLeft: 10,
  },
  searchButton: {
    padding: 5,
  },
  
  // Lista de Chats
  list: {
    flex: 1,
    marginTop: 82 + (Platform.OS === 'ios' ? 20 : 0), // Espaço para o Header
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 200, // Garante que a lista não fique escondida pelos footers decorativos
  },

  // Footers Decorativos (Simulando div e footer)
  decorativeFooter: {
    position: 'absolute',
    bottom: 82, // Altura do footer principal
    left: 0,
    right: 0,
    height: 303, // Altura original
    backgroundColor: 'white',
    borderRadius: 30, // rounded-[30px]
    zIndex: 1,
    // Note: Esta View está no local do design, mas não é necessária para a funcionalidade.
  },
  absoluteFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 166, // Altura original
    backgroundColor: '#000048',
    zIndex: 0,
  }
});

// --- Estilos do Item de Chat ---
const itemStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    width: '100%', // Ocupa a largura total
  },
  avatar: {
    width: 49,
    height: 47,
    borderRadius: 25, // Para ser circular
    marginRight: 15,
  },
  content: {
    flex: 1, // Ocupa o espaço central
    justifyContent: 'center',
  },
  name: {
    // Inter-BlackItalic, text-xl, text-black
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    color: 'black',
  },
  message: {
    // Inter-Italic, text-base, text-black
    fontSize: 16,
    fontStyle: 'italic',
    color: 'black',
    opacity: 0.7, // Para destacar o nome
  },
  time: {
    // Inter-Italic, text-base, text-black
    fontSize: 16,
    fontStyle: 'italic',
    color: 'black',
    marginLeft: 10,
  },
});