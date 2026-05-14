import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";

export default function Lista({ navigation }) {
  const [dados, setDados] = useState([]);
  const [modal, setModal] = useState(false);
  const [recebeDado, setRecebeDado] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function Buscar() {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://10.0.2.2:8000/api/times"
        );

        console.log("Dados recebidos:", response.data);

        const timesData =
          response.data.data?.data || response.data.data || [];

        setDados(timesData);

      } catch (error) {

        console.log(
          "ERRO",
          error.response?.data || error.message
        );

        Alert.alert(
          "Erro",
          "Não foi possível carregar os times"
        );

      } finally {

        setLoading(false);

      }
    }

    Buscar();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        setRecebeDado(item);
        setModal(true);
      }}
      style={styles.timeCard}
    >
      <Text style={styles.nomeTime}>{item.nome}</Text>

      <Text style={styles.infoText}>
        📅 {item.ano} | 📍 {item.estado}
      </Text>

      <Text style={styles.titulosText}>
        🏆 {item.titulos} título(s)
      </Text>

      {/* BOTÃO EDITAR */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("EditarTime", {
            time: item
          })
        }
      >
        <Text style={styles.editButtonText}>
          EDITAR TIME
        </Text>
      </TouchableOpacity>
    </Pressable>
  );

  if (loading) {
    return (
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600",
        }}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.overlay}>
            <Text style={styles.logo}>
              FUT<Text style={styles.span}>API</Text>
            </Text>

            <Text style={styles.title}>
              CARREGANDO TIMES...
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600",
      }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>

          <Text style={styles.logo}>
            FUT<Text style={styles.span}>API</Text>
          </Text>

          <Text style={styles.title}>
            TIMES CADASTRADOS
          </Text>

          <FlatList
            data={dados}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate("CriarTime")}
          >
            <Text style={styles.buttonText}>
              CRIAR TIME
            </Text>
          </TouchableOpacity>

          <Modal
            visible={modal}
            transparent={false}
            animationType="slide"
          >
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600",
              }}
              style={styles.background}
            >
              <View style={styles.overlay}>

                <Text style={styles.logo}>
                  FUT<Text style={styles.span}>API</Text>
                </Text>

                <Text style={styles.title}>
                  DETALHES DO TIME
                </Text>

                <ScrollView style={styles.modalContent}>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>
                      Nome:
                    </Text>

                    <Text style={styles.value}>
                      {recebeDado.nome}
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>
                      Ano:
                    </Text>

                    <Text style={styles.value}>
                      {recebeDado.ano}
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>
                      Estado:
                    </Text>

                    <Text style={styles.value}>
                      {recebeDado.estado}
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>
                      Títulos:
                    </Text>

                    <Text style={styles.value}>
                      {recebeDado.titulos}
                    </Text>
                  </View>

                </ScrollView>

                <TouchableOpacity
                  style={styles.buttonEdit}
                  onPress={() => {
                    setModal(false);

                    navigation.navigate("EditarTime", {
                      id: recebeDado.id,
                      nome: recebeDado.nome,
                      ano: recebeDado.ano,
                      estado: recebeDado.estado,
                      titulos: recebeDado.titulos,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>
                    EDITAR TIME
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonPrimary}
                  onPress={() => setModal(false)}
                >
                  <Text style={styles.buttonText}>
                    FECHAR
                  </Text>
                </TouchableOpacity>

              </View>
            </ImageBackground>
          </Modal>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(10,10,10,0.9)",
    padding: 30,
  },

  logo: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },

  span: {
    color: "#e2fd10",
  },

  title: {
    color: "#e2fd10",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  timeCard: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },

  nomeTime: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },

  infoText: {
    color: "#e2fd10",
    fontSize: 16,
    marginBottom: 4,
  },

  titulosText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  editButton: {
    backgroundColor: "#e2fd10",
    marginTop: 15,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },

  editButtonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 14,
  },

  modalContent: {
    backgroundColor: "rgba(26,26,26,0.95)",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    maxHeight: 400,
  },

  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    alignItems: "center",
  },

  label: {
    color: "#e2fd10",
    fontSize: 16,
    fontWeight: "700",
  },

  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },

  buttonPrimary: {
    backgroundColor: "#e2fd10",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  buttonEdit: {
    backgroundColor: "#3498db",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  buttonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
});