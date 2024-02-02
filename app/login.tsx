import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import logo from '@/assets/images/logo/logo-orange-text.png';
import Input from "@/components/ui/input";
import { EyeOpen } from "@/components/icons";
import { useState } from "react";
import Button from "@/components/ui/button";
import { Link } from "expo-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // TODO: login
  }

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
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry={!showPassword}
        >
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <EyeOpen color={showPassword ? '#FF9D42' : '#939393'} />
          </TouchableOpacity>
        </Input>

        <Button
          label="Login"
          onPress={handleLogin}
        />
      </View>

      <View style={styles.registerContainer}>
        <Text
          style={{ fontFamily: 'Bitter_400Regular', color: "#1E1E1E", opacity: 0.7 }}
        >
          Don't have an account?
        </Text>

        <Link href="/register" style={{ color: "#FF9D42", fontFamily: 'Bitter_700Bold', fontSize: 16 }}>
          Create your account
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 140.9,
    height: 28.08,
    marginBottom: 48,
  },
  formContainer: {
    gap: 8,
    width: '100%',
    marginBottom: 24,
  },
  registerContainer: {
    gap: 16,
    alignItems: 'center',
  }
});