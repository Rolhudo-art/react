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

export default function EditarTime({ navigation, route }) {

  const {
    id,
    nome: nomeInicial,
    ano: anoInicial,
    estado: estadoInicial,
    titulos: titulosInicial
  } = route.params;

  const [nome, setNome] = useState(nomeInicial);
  const [ano, setAno] = useState(String(anoInicial));
  const [estado, setEstado] = useState(estadoInicial);
  const [titulos, setTitulos] = useState(String(titulosInicial));
  const [loading, setLoading] = useState(false);

  async function handleEditarTime() {

    if(nome === "" || ano === "" || estado === "" || titulos === ""){
      Alert.alert("ERRO", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {

      const token = await AsyncStorage.getItem('token');

      const response = await axios.put(
        `http://10.0.2.2:8000/api/times/${id}`,
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

      Alert.alert(
        "Sucesso!",
        "Time atualizado com sucesso!"
      );

      navigation.navigate("Lista");

    } catch (error) {

      console.log("ERRO:", error);

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

  async function handleDeletarTime() {

    Alert.alert(
      "Deletar Time",
      "Tem certeza que deseja deletar este time?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {

            try {

              const token = await AsyncStorage.getItem('token');

              await axios.delete(
                `http://10.0.2.2:8000/api/times/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                  }
                }
              );

              Alert.alert(
                "Sucesso!",
                "Time deletado com sucesso!"
              );

              navigation.navigate("Lista");

            } catch (error) {

              console.log("ERRO DELETE:", error);

              Alert.alert(
                "Erro",
                "Não foi possível deletar o time"
              );
            }
          }
        }
      ]
    );
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
        
        <Text style={styles.title}>EDITAR TIME</Text>

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
          onPress={handleEditarTime}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonDelete}
          onPress={handleDeletarTime}
        >
          <Text style={styles.buttonDeleteText}>
            DELETAR TIME
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
    backgroundColor: '#3498db', 
    padding: 18, 
    borderRadius: 5, 
    alignItems: 'center',
    marginTop: 10
  },

  buttonDelete: {
    backgroundColor: '#e74c3c',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15
  },

  buttonText: { 
    color: '#fff', 
    fontWeight: '900',
    fontSize: 16
  },

  buttonDeleteText: {
    color: '#fff',
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