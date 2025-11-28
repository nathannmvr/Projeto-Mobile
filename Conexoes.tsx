import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    Dimensions,
} from "react-native";
import { Ionicons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// 1. Mapeamento de Assets
const assets = {
    // Ícone de Retorno
    backIcon: require('./assets/image-26.png'),
    // Fundo do Header (rectangle19.svg)
    headerBackground: require('./assets/rectangle-19.svg'),
    // Avatares (Exemplo: image-14.png e image.png)
    avatarMaria: require('./assets/image-14.png'),
    avatarJose: require('./assets/image-14.png'),
};

// 2. Definição da interface de dados e dos dados
interface Connection {
    id: number;
    name: string;
    description: string;
    avatar: any;
    status: 'Conectar' | 'Conectado';
}

const connectionsData: Connection[] = [
    {
        id: 1,
        name: "Maria Madalena",
        description: "Designer criativo com paixão por arte e tecnologia.",
        avatar: assets.avatarMaria,
        status: 'Conectar',
    },
    {
        id: 2,
        name: "José Davi",
        description: "Especialista em engenharia.",
        avatar: assets.avatarJose,
        status: 'Conectar',
    },
    // Você pode adicionar mais itens aqui para testar a rolagem
];


// --- Componente Card de Conexão ---
const ConnectionCard: React.FC<{ connection: Connection }> = ({ connection }) => {
    const handleConnect = () => {
        console.log(`Ação: ${connection.status} com ${connection.name}`);
        // Lógica para enviar solicitação de conexão ou remover conexão
    };

    return (
        <View style={cardStyles.cardContainer}>
            <View style={cardStyles.cardContent}>
                {/* Avatar */}
                <Image
                    source={connection.avatar}
                    style={cardStyles.avatar}
                    resizeMode="cover"
                />

                {/* Texto (Nome e Descrição) */}
                <View style={cardStyles.textGroup}>
                    <Text style={cardStyles.nameText}>{connection.name}</Text>
                    <Text style={cardStyles.descriptionText}>{connection.description}</Text>
                </View>

                {/* Botão de Ação (Conectar) */}
                <TouchableOpacity
                    style={cardStyles.connectButton}
                    onPress={handleConnect}
                >
                    <Text style={cardStyles.connectButtonText}>{connection.status}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- Tela Principal de Conexões ---
export const Conexes = (): React.ReactElement => {

    const handleVerMais = () => {
        console.log("Ver mais conexões clicado.");
        // Lógica para carregar mais itens da lista
    };

    return (
        <View style={styles.container}>

            {/* --- HEADER (Fixo no Topo) --- */}
            <View style={styles.header}>
                <View style={styles.headerBackground} />
                <View style={styles.headerContent}>

                    {/* Botão Voltar (image37) */}
                    <TouchableOpacity onPress={() => console.log('Voltar')} style={styles.backButton}>
                        <Image source={assets.backIcon} style={styles.backIcon} resizeMode="contain" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Conexões</Text>
                </View>
            </View>

            {/* --- LISTA DE CONEXÕES (Scrollable) --- */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {connectionsData.map((connection) => (
                    <ConnectionCard key={connection.id} connection={connection} />
                ))}

                {/* --- Botão Ver Mais (Simulando div: d9d9d9) --- */}
                <TouchableOpacity
                    style={styles.verMaisButton}
                    onPress={handleVerMais}
                >
                    <Text style={styles.verMaisText}>Ver mais...</Text>
                    {/* O vetor 'vector.svg' que parece ser um indicador de 'mais' ou 'próximo' pode ser substituído por um ícone de seta */}
                    <Icon name="chevron-down-outline" size={20} color="black" style={{ marginLeft: 5 }} />
                </TouchableOpacity>

                <View style={{ height: 50 }} />
            </ScrollView>

        </View>
    );
};

// --- Estilos do Card de Conexão ---
const cardStyles = StyleSheet.create({
    cardContainer: {
        width: width * 0.9,
        backgroundColor: '#000048',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20, // Espaçamento entre cards
        alignSelf: 'center', // Centraliza o card na tela
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 50, // w-[50px]
        height: 48, // h-12
        borderRadius: 24,
        marginRight: 10,
    },
    textGroup: {
        flex: 1, // Ocupa o espaço central
        marginRight: 10,
    },
    nameText: {
        // Inter-Bold, text-2xl, text-white
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 2,
    },
    descriptionText: {
        // Inter-SemiBold, text-base, text-white
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        lineHeight: 20,
    },
    connectButton: {
        // bg-[#fdf6f6] rounded-[15px]
        width: 96, // w-24
        height: 27,
        backgroundColor: '#fdf6f6',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    connectButtonText: {
        // Inter-SemiBold, text-base, text-black
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    }
});

// --- Estilos Globais da Tela ---
const HEADER_HEIGHT = 85;

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
        paddingTop: Platform.OS === 'ios' ? 40 : 10,
        paddingHorizontal: 15,
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundColor: '#000048', // Cor do rectangle19.svg (fundo)
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 5,
    },
    backIcon: {
        width: 30, // Ajustado
        height: 30,
        marginRight: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic', // BoldItalic
    },

    // Lista de Conexões (Scrollable)
    scrollView: {
        flex: 1,
        marginTop: HEADER_HEIGHT + 30, // Abaixo do Header + espaçamento
        paddingHorizontal: 15,
    },
    scrollContent: {
        paddingBottom: 20,
        alignItems: 'center',
    },

    // Botão "Ver Mais"
    verMaisButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#d9d9d9', // Fundo cinza do design original
        borderRadius: 15,
        marginTop: 20,
        alignSelf: 'center',
    },
    verMaisText: {
        // Inter-Medium, text-base, text-black
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
    },
});