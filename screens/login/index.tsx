import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import { Image } from "expo-image";

import Input from "@/components/ui/input";
import { EyeOpen } from "@/components/icons";
import Button from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

import logo from "@/assets/images/logo/logo-orange-text.png";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    const result = await onLogin!(email, password);

    if (result && result.error) {
      alert(result.message);
    }

    if (result.status === 200) {
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
      />

      <View style={styles.formContainer}>
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        >
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <EyeOpen color={showPassword ? "#FF9D42" : "#939393"} />
          </TouchableOpacity>
        </Input>

        <Button
          label="Login"
          onPress={handleLogin}
        />
      </View>

      <View style={styles.registerContainer}>
        <Text
          style={{ fontFamily: "Bitter_400Regular", color: "#1E1E1E", opacity: 0.7 }}
        >
          Don't have an account?
        </Text>

        <Link href="/register" style={{ color: "#FF9D42", fontFamily: "Bitter_700Bold", fontSize: 16 }}>
          Create your account
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  logo: {
    width: 140.9,
    height: 28.08,
    marginBottom: 48,
  },
  formContainer: {
    gap: 8,
    width: "100%",
    marginBottom: 24,
  },
  registerContainer: {
    gap: 16,
    alignItems: "center",
  },
});