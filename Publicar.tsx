import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    Dimensions,
} from "react-native";
// Importando ícones (necessita da instalação: react-native-vector-icons)
import { Ionicons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mapeamento de Assets
const assets = {
    // Ícone de Retorno (image38)
    backIcon: require('./assets/image-26.png'),
};

// --- Componente Botão de Ação ---
interface ActionButtonProps {
    title: string;
    isPrimary?: boolean; // Cor principal (azul)
    isWhite?: boolean;  // Fundo branco (para Criar Novo Projeto)
    onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, isPrimary = false, isWhite = false, onPress }) => {
    // Use a permissive array type so we can push different style fragments without TypeScript errors
    let buttonStyle: any[] = [actionStyles.button];
    let textStyle: any[] = [actionStyles.buttonText];

    if (isPrimary) {
        buttonStyle.push(actionStyles.primaryBackground);
        textStyle.push(actionStyles.whiteText);
    } else if (isWhite) {
        buttonStyle.push(actionStyles.whiteBackground);
        textStyle.push(actionStyles.darkText);
    } else {
        // Default: Background azul para Ver e Gerenciar
        buttonStyle.push(actionStyles.primaryBackground);
        textStyle.push(actionStyles.whiteText);
    }

    // Estilos de texto específicos do design original (SemiBold Italic)
    textStyle.push(actionStyles.semiBoldItalic);

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

// --- Tela Principal ---
export const PublicarProjetos = (): React.ReactElement => {

    const handleAction = (action: string) => {
        console.log(`Ação clicada: ${action}`);
        // Implemente a navegação aqui
    };

    return (
        <View style={styles.container}>

            {/* --- HEADER (Fixo no Topo) --- */}
            <View style={styles.header}>
                {/* Fundo do Header (rectangle40.svg) */}
                <View style={styles.headerBackground} />
                <View style={styles.headerContent}>

                    {/* Botão Voltar (image38) */}
                    <TouchableOpacity onPress={() => handleAction('Voltar')} style={styles.backButton}>
                        <Image source={assets.backIcon} style={styles.backIcon} resizeMode="contain" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Publicar projetos</Text>
                </View>
            </View>

            {/* --- CONTEÚDO PRINCIPAL (Centralizado) --- */}
            <View style={styles.contentArea}>

                {/* Fundo Cinza para o Menu (d9d9d9) */}
                <View style={styles.menuBackground}>

                    {/* Botão 1: Criar novo projeto (Fundo Branco) */}
                    <ActionButton
                        title="Criar novo projeto"
                        isWhite
                        onPress={() => handleAction('Criar Projeto')}
                    />

                    {/* Botão 2: Ver projetos existentes (Fundo Azul) */}
                    <ActionButton
                        title="Ver projetos existentes"
                        isPrimary
                        onPress={() => handleAction('Ver Projetos')}
                    />

                    {/* Botão 3: Gerenciar conteúdo publicado (Fundo Azul) */}
                    <ActionButton
                        title="Gerenciar conteúdo publicado"
                        isPrimary
                        onPress={() => handleAction('Gerenciar Conteúdo')}
                    />

                </View>

            </View>

        </View>
    );
};

// --- Estilos dos Botões de Ação ---
const actionStyles = StyleSheet.create({
    button: {
        width: 280, // Largura fixa do design original
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // Espaçamento entre os botões
        ...Platform.select({ // Adiciona sombra para destaque
            ios: { shadowOpacity: 0.2, shadowRadius: 3, shadowOffset: { height: 2, width: 0 } },
            android: { elevation: 3 },
        }),
    },
    primaryBackground: {
        backgroundColor: '#000048', // Cor primária (Azul Escuro)
    },
    whiteBackground: {
        backgroundColor: 'white',
        borderWidth: 1, // Adiciona borda sutil para destaque
        borderColor: '#ccc',
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    darkText: {
        color: 'black',
    },
    whiteText: {
        color: 'white',
    },
    semiBoldItalic: {
        fontWeight: '600',
        fontStyle: 'italic',
    }
});

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
        height: 85,
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
        backgroundColor: '#000048', // Cor do rectangle40.svg (fundo)
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
        fontStyle: 'italic',
    },

    // Área de Conteúdo (Menu)
    contentArea: {
        flex: 1,
        marginTop: 85, // Abaixo do Header
        alignItems: 'center',
        paddingTop: 30, // Espaçamento interno
    },
    menuBackground: {
        width: width * 0.9, // 90% da largura
        maxWidth: 380,
        paddingVertical: 30,
        backgroundColor: '#d9d9d9', // Fundo cinza do menu
        borderRadius: 15,
        alignItems: 'center',
    },
});