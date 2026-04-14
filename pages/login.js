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

export default function Login({ navigation }) {
  // Estados do componente
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Função principal de login
  async function handleLogin() {
    // Validação: campos vazios
    if (email === "" || password === "") {
      Alert.alert("ERRO", "Preencha todos os campos!");
      return;
    }

    setLoading(true); // Desabilita botão e mostra "ENTRANDO..."

    try {
      // Requisição para a API Laravel
      const response = await axios.post(
        "http://10.0.2.2:8000/api/auth/login", // URL do backend
        { email: email, password: password },   // Dados enviados
        { timeout: 5000 }                       // Tempo máximo de espera
      );

      console.log("Resposta do servidor:", response.data);

      // Verifica se o backend retornou sucesso e token (conforme seu controller)
      if (response.data.success === true && response.data.token) {
        // Salva token e dados do usuário localmente
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

        Alert.alert("Sucesso", "Login realizado com sucesso!");
        navigation.replace("Welcome"); // Navega para a tela principal
      } else {
        // Se a resposta não contém token ou success=false
        Alert.alert("Erro", response.data.message || "Falha no login");
      }
    } catch (error) {
      // Tratamento detalhado de erros
      console.log("Erro completo:", error);

      if (error.response) {
        // Servidor respondeu com erro (401, 422, 500...)
        console.log("Dados do erro:", error.response.data);
        const msg = error.response.data.message || "E-mail ou senha inválidos";
        Alert.alert("Erro", msg);
      } else if (error.request) {
        // Requisição feita, mas sem resposta (servidor offline ou CORS)
        Alert.alert("Erro", "Servidor não respondeu. Verifique IP e Laravel.");
      } else {
        // Erro de configuração (ex: URL inválida)
        Alert.alert("Erro", "Erro inesperado: " + error.message);
      }
    } finally {
      setLoading(false); // Reabilita o botão
    }
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.logo}>
            FUT<Text style={styles.span}>API</Text>
          </Text>
          <Text style={styles.title}>LOGIN</Text>

          <TextInput 
            style={styles.input} 
            placeholder="E-mail" 
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput 
            style={styles.input} 
            placeholder="Senha" 
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={styles.buttonPrimary} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "ENTRANDO..." : "ENTRAR"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.link}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(10,10,10,0.85)', justifyContent: 'center', padding: 20 },
  container: { alignItems: 'center' },
  logo: { fontSize: 40, fontWeight: '900', color: '#fff', marginBottom: 40 },
  span: { color: '#e2fd10' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { 
    width: '100%', 
    height: 50, 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    borderRadius: 5, 
    color: '#fff', 
    paddingHorizontal: 15, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333'
  },
  buttonPrimary: { 
    backgroundColor: '#e2fd10', 
    width: '100%', 
    height: 50, 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { color: '#0a0a0a', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#888', marginTop: 20 }
});