import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    Platform,
    Alert,
    StatusBar,
    SafeAreaView,
    KeyboardAvoidingView,
} from "react-native";
import { Ionicons as Icon } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Mapeamento de Assets
const assets = {
    // Ícone de Logo/Voltar (image23)
    backIcon: require('./assets/image-26.png'),
    // Fundo do Header (rectangle11.svg)
    headerBackground: require('./assets/rectangle-11.svg'),
    // Fundo do Mapa (image36) - Substituímos pela cor, pois o mapa é dinâmico
    // Ícone de Busca/Ação (image1) - Substituímos por vetor
    mapa: require('./assets/mapa.png'),
};

export const ConectaMaker: React.FC = () => {
    const [searchText, setSearchText] = useState("");

    // Calcula alturas responsivas para header e bottom menu
    const statusBarHeight = Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight || 24);
    const HEADER_HEIGHT = Math.round(statusBarHeight + 46); // altura do header adaptativa
    const BOTTOM_MENU_MIN = Math.round(Math.max(140, height * 0.18)); // altura mínima do menu inferior

    const styles = createStyles(HEADER_HEIGHT, BOTTOM_MENU_MIN);

    const handleSearch = () => {
        console.log("Pesquisar laboratórios:", searchText);
    };

    const handleMyLocation = () => {
        Alert.alert("Localização", "Função para centralizar o mapa na sua localização atual.");
    };

    const handleFilter = () => {
        Alert.alert("Filtrar", "Função para abrir o modal de filtros de laboratórios.");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                {/* --- MAPA --- */}
                <View style={styles.mapArea}>
                    <ImageBackground source={assets.mapa} style={styles.mapImage} resizeMode="cover">
                        {/* pins/overlays aqui */}
                    </ImageBackground>
                </View>

                {/* --- HEADER --- */}
                <View style={[styles.header, { height: HEADER_HEIGHT, paddingTop: statusBarHeight }]}>
                    <View style={styles.headerBackground} />
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => console.log('Voltar')} style={styles.backButton}>
                            <Image source={assets.backIcon} style={styles.backIcon} resizeMode="contain" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Conecta Maker</Text>
                    </View>
                </View>

                {/* --- BOTTOM MENU --- */}
                <View style={[styles.bottomMenuContainer, { minHeight: BOTTOM_MENU_MIN }]}>
                    <View style={styles.searchBlock}>
                        <View style={styles.searchInner}>
                            <TextInput
                                style={styles.searchInput}
                                value={searchText}
                                onChangeText={setSearchText}
                                placeholder="Pesquisar laboratórios..."
                                placeholderTextColor="#9a9a9a"
                                onSubmitEditing={handleSearch}
                                returnKeyType="search"
                            />
                            <TouchableOpacity onPress={handleSearch} style={styles.searchIconWrapper}>
                                <Icon name="search-outline" size={22} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity onPress={handleMyLocation} style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Minha Localização</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleFilter} style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Filtrar laboratórios</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// --- Estilos ---
const createStyles = (HEADER_HEIGHT: number, BOTTOM_MENU_MIN: number) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    // Área do mapa ajustada para evitar sobreposição
    mapArea: {
        flex: 1,
        backgroundColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: HEADER_HEIGHT, // evita ser coberto pelo header
        paddingBottom: BOTTOM_MENU_MIN, // evita ser coberto pelo bottom menu
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },

    // Header
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000048',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 6,
        marginRight: 8,
        color: 'white',
    },
    backIcon: {
        width: 32,
        height: 32,
    },
    headerTitle: {
        color: 'white',
        fontSize: Math.round(Math.max(18, width * 0.06)),
        fontWeight: '700',
    },

    // Bottom menu
    bottomMenuContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#d9d9d9',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 15,
    },

    // Search
    searchBlock: {
        backgroundColor: '#000048',
        width: '100%',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 14,
    },
    searchInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        backgroundColor: 'white',
        borderRadius: 14,
        height: 40,
        paddingHorizontal: 12,
        fontSize: Math.round(Math.max(14, width * 0.036)),
        fontWeight: '700',
        color: '#333',
        flex: 1, // ocupa o espaço restante
    },
    searchIconWrapper: {
        marginLeft: 10,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Actions
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap', // quebra em telas estreitas
    },
    actionButton: {
        flex: 1,
        minWidth: 140,
        height: 44,
        backgroundColor: '#000048',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginBottom: 8, // para quando quebrar a linha
    },
    actionButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    }
});