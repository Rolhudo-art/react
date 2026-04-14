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

export default function Cadastro({navigation}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function Cadastrar(){

    if(name === "" || email === "" || password === "" || confirmPassword === ""){
      Alert.alert("ERRO", "Preencha todos os campos!");
      return;
    }

    if(password !== confirmPassword){
      Alert.alert("ERRO", "As senhas não coincidem!");
      return;
    }

    const values = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "http://10.0.2.2:8000/api/auth/register",
        values,
        {
          timeout: 4000
        }
      );

      console.log("RESPOSTA:", response.data);

      Alert.alert("Sucesso!", "Usuário cadastrado com sucesso!");
      navigation.navigate("Login");

    } catch (error) {

      console.log("ERRO COMPLETO:", error);

      if (error.response) {
        console.log("ERRO BACKEND:", error.response.data);
        Alert.alert("Erro", error.response.data.message || "Erro no servidor");
      } else if (error.request) {
        Alert.alert("Erro", "Servidor não respondeu (verifique IP/Laravel)");
      } else {
        Alert.alert("Erro", "Erro inesperado");
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
        
        <Text style={styles.title}>CRIAR CONTA</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Nome Completo" 
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          placeholderTextColor="#888"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Confirmar Senha" 
          placeholderTextColor="#888"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity 
          style={styles.buttonPrimary} 
          onPress={Cadastrar}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Cadastrando..." : "CADASTRAR"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={()=>navigation.navigate("Login")}
        >
          <Text style={styles.backText}>Já tenho uma conta? Entrar</Text>
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