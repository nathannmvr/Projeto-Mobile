import React, { useState, useRef, ClipboardEvent } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  Keyboard, // Para fechar o teclado
} from "react-native";

// O React Native não usa a tag <img> diretamente do DOM.
// Precisamos importar a imagem localmente ou usar um URI.
// Para este exemplo, vou usar um placeholder até que você adicione a imagem
// em uma pasta `assets` e a importe corretamente.
const robotAdjustableWrench2 = require('./assets/robot-adjustable-wrench-2.png'); 

export const Verificacao = (): React.ReactElement => {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  // useRef no Native aponta para o componente, não para o HTMLInputElement
  const inputRefs = useRef<Array<TextInput | null>>([]); 

  const handleChange = (index: number, value: string) => {
    // A lógica de maxLength=1 e inputMode="numeric" já ajuda, mas mantemos a verificação de dígito
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Se um dígito foi inserido e não é o último campo, foca no próximo
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    } else if (value && index === 4) {
      // Se for o último campo, esconde o teclado
      Keyboard.dismiss(); 
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    // 'e.nativeEvent.key' pode ser usado, mas é mais confiável checar se o campo está vazio.
    // O evento onKeyPress/onKeyDown no Native é um pouco diferente do Web.
    // A lógica de backspace é tipicamente tratada implicitamente pela mudança de estado (no onChangeText).
    // Para implementar o foco no anterior, verificamos se o campo atual está vazio e se Backspace foi pressionado.
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    // A API de colagem no React Native é ligeiramente diferente (onPaste só existe no <TextInput>)
    const pastedData = e.clipboardData.getData("text").slice(0, 5);

    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 5; i++) {
      newCode[i] = pastedData[i];
    }
    setCode(newCode);

    const nextEmptyIndex = Math.min(pastedData.length, 4);
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 5) {
      console.log("Verification code submitted:", verificationCode);
      // Adicione aqui a lógica de navegação ou chamada de API
    }
  };

  return (
    // 'div' é substituído por 'View'. Flexbox é o padrão de layout.
    <View style={styles.container}>
      <View style={styles.contentArea}>
        {/* Imagem */}
        <Image
          source={robotAdjustableWrench2}
          style={styles.image}
        />

        {/* Texto de Verificação */}
        <Text style={styles.title}>
          Verifique o seu e-mail acabamos de {"\n"}
          enviar um código
        </Text>

        {/* Descrição */}
        <Text style={styles.description}>
          Insira no campo abaixo o código recebido por e-mail
        </Text>

        {/* Container dos Inputs de Código */}
        <View style={styles.inputGroup}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              style={styles.inputBox}
              keyboardType="numeric" // Equivalente a inputMode="numeric"
              maxLength={1}
              value={digit}
              // No Native, usamos 'onChangeText' para obter o valor diretamente
              onChangeText={(value) => handleChange(index, value)}
              onKeyPress={(e) => handleKeyDown(index, e)}
              // Nota: handlePaste não é suportado diretamente em todos os TextInput,
              // mas a colagem é geralmente tratada pelo sistema operacional/onChangeText.
              // Para um controle fino, você usaria bibliotecas específicas ou onPaste em plataformas mais novas.
              aria-label={`Dígito ${index + 1} do código de verificação`}
            />
          ))}
        </View>

        {/* Botão Enviar */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit} // Usa onPress no lugar de onClick
          accessibilityLabel="Enviar código de verificação"
        >
          <Text style={styles.buttonText}>
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Equivalência CSS/StyleSheet ---
const styles = StyleSheet.create({
  container: {
    // Equivalente a bg-white, overflow-hidden, w-full, h-full
    flex: 1, // Ocupa todo o espaço
    backgroundColor: 'white',
    alignItems: 'center', // Centraliza o conteúdo (contentArea) horizontalmente
    paddingTop: 80, // Adicione algum padding superior se necessário
  },
  contentArea: {
    // Equivalente a w-[416px] h-[599px] relative - usamos valores fixos ou percentuais
    width: '100%', // Largura total (ajustada pelo alignItems do container)
    maxWidth: 412, // Limite a largura para simular o design
    alignItems: 'center', // Centraliza os elementos filhos
    paddingHorizontal: 20,
  },
  title: {
    // Equivalente a Inter-Bold, text-[#000048], text-xl, text-center
    fontFamily: 'System', // Use fontes customizadas se precisar de Inter-Bold
    fontWeight: 'bold',
    color: '#000048',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30, // Ajuste para a posição relativa (top: 366px)
  },
  image: {
    // Equivalente a w-[239px] h-[303px]
    width: 239,
    height: 303,
    resizeMode: 'contain', // Garante que a imagem caiba
    // Posição no Native é feita com Margin ou flexbox
    marginBottom: 20,
  },
  description: {
    // Equivalente a Inter-Medium, text-[#aaa7a7], text-base, text-center
    fontFamily: 'System',
    fontWeight: '500',
    color: '#aaa7a7',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15, // Ajuste para a posição relativa (top: 425px)
    marginBottom: 30,
  },
  inputGroup: {
    // Equivalente a flex gap-[19px]
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza os inputs
    gap: 19, // Use a propriedade `gap` (disponível em versões recentes do RN)
    // Se o gap não funcionar, use marginHorizontal nos inputs
  },
  inputBox: {
    // Equivalente a w-[41px] h-12, bg-[#d9d9d9], rounded-[10px], text-center, text-xl, focus styles
    width: 41,
    height: 48,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000048',
    // Não há 'focus:ring' no Native, usamos 'borderColor' ou 'borderWidth' para simular
    borderWidth: 2,
    borderColor: 'transparent', // Padrão transparente
  },
  button: {
    // Equivalente a w-[181px] h-11, bg-[#000048], rounded-[20px]
    width: 181,
    height: 44,
    backgroundColor: '#000048',
    borderRadius: 22, // 20px arredondado
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40, // Ajuste para a posição relativa (top: 555px)
  },
  buttonText: {
    // Equivalente a Inter-Bold, text-white, text-xl
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});

// Exportação default requerida por `index.ts`
export default Verificacao;