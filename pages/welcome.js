import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';

export default function Welcome({navigation}) {

  function Cadastro(){

navigation.navigate("Cadastro")

  }

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Cabeçalho Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Temporada 2026</Text>
        </View>

        {/* Texto Central */}
        <View style={styles.content}>
          <Text style={styles.logo}>FUT<Text style={styles.span}>API</Text></Text>
          <Text style={styles.headline}>
            TUDO SOBRE O {"\n"}
            <Text style={styles.outline}>SEU TIME</Text> {"\n"}
            EM UM SÓ LUGAR.
          </Text>
          <Text style={styles.description}>
            Acompanhe escalações, estatísticas detalhadas e posições em tempo real.
          </Text>

          {/* Área de Botões */}
        {/* Área de Botões */}
<View style={styles.buttonContainer}>
  <TouchableOpacity 
    style={styles.buttonPrimary}
    onPress={() => navigation.navigate("Login")}
  >
    <Text style={styles.buttonTextPrimary}>LOGAR</Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={styles.buttonSecondary}
    onPress={() => navigation.navigate("Cadastro")}
  >
    <Text style={styles.buttonTextSecondary}>CADASTRAR</Text>
  </TouchableOpacity>
</View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  badgeText: {
    color: '#e2fd10',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 10,
  },
  span: {
    color: '#e2fd10',
  },
  headline: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 45,
    marginBottom: 20,
  },
  outline: {
    color: '#e2fd10',
  },
  description: {
    color: '#888',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 15,
  },
  buttonPrimary: {
    backgroundColor: '#e2fd10',
    paddingVertical: 18,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2fd10',
  },
  buttonTextSecondary: {
    color: '#e2fd10',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});