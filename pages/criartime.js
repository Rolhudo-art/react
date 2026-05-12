import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground,
  Alert
} from 'react-native';

export default function CriarTime({ navigation }) {

  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [estado, setEstado] = useState("");
  const [titulos, setTitulos] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCriarTime() {

    if(nome === "" || ano === "" || estado === "" || titulos === ""){
      Alert.alert("ERRO", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {

      // PEGAR TOKEN SALVO NO LOGIN
      const token = await AsyncStorage.getItem('token');

      console.log("TOKEN:", token);

      const response = await axios.post(
        "http://10.0.2.2:8000/api/times",
        {
          nome,
          ano,
          estado: estado.toUpperCase(),
          titulos
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          },
          timeout: 5000
        }
      );

      console.log("RESPOSTA:", response.data);

      Alert.alert("Sucesso!", "Time criado com sucesso!");

      navigation.navigate("Lista");

    } catch (error) {

      console.log("ERRO COMPLETO:", error);

      if (error.response) {
        console.log("ERRO BACKEND:", error.response.data);

        Alert.alert(
          "Erro",
          error.response.data.message || "Erro no servidor"
        );

      } else if (error.request) {

        Alert.alert(
          "Erro",
          "Servidor não respondeu"
        );

      } else {

        Alert.alert(
          "Erro",
          "Erro inesperado"
        );
      }

    } finally {
      setLoading(false);
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
        
        <Text style={styles.title}>CRIAR TIME</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Nome do Time" 
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Ano de Fundação" 
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={ano}
          onChangeText={setAno}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Estado (SP)" 
          placeholderTextColor="#888"
          maxLength={2}
          value={estado}
          onChangeText={setEstado}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Quantidade de Títulos" 
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={titulos}
          onChangeText={setTitulos}
        />

        <TouchableOpacity 
          style={styles.buttonPrimary} 
          onPress={handleCriarTime}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "CRIANDO..." : "CRIAR TIME"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1 
  },

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

  span: { 
    color: '#e2fd10' 
  },

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