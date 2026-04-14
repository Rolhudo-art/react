import React, { useState } from 'react';
import axios from 'axios';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground,
  Alert
} from 'react-native';

export default function Cep({navigation}) {

  const [cep, SetCep] = useState("");
  const [endereco, SetEndereco] = useState("");

  async function Buscar() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP");
    }
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        
        <Text style={styles.logo}>
          FUT<Text style={styles.span}>API</Text>
        </Text>
        
        <Text style={styles.title}>CRIAR CONTA</Text>

        <TextInput 
          style={styles.input} 
          placeholder={"Digite o CEP"} 
          value={cep} 
          onChangeText={SetCep}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={Buscar}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(10,10,10,0.9)', 
    padding: 30, 
    justifyContent: 'center' 
  },
  logo: { 
    fontSize: 40, 
    fontWeight: '900', 
    color: '#fff', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  span: { color: '#e2fd10' },
  title: { 
    color: '#e2fd10', 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 30, 
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  input: { 
    backgroundColor: '#1a1a1a', 
    color: '#fff', 
    padding: 15, 
    borderRadius: 5, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333'
  },
  buttonPrimary: { 
    backgroundColor: '#e2fd10', 
    padding: 18, 
    borderRadius: 5, 
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { 
    color: '#000', 
    fontWeight: '900',
    fontSize: 16
  },
  buttonSecondary: { 
    marginTop: 25, 
    alignItems: 'center' 
  },
  backText: {
    color: '#888',
    fontSize: 14
  }
});