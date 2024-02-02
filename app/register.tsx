import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import logo from '@/assets/images/logo/logo-orange-text.png';
import Input from "@/components/ui/input";
import { EyeOpen } from "@/components/icons";
import { useState } from "react";
import Button from "@/components/ui/button";
import { Link } from "expo-router";


export default function Register() {
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
          placeholder="Choose your username"
          autoCapitalize="none"
          textContentType="username"
        />
        <Input
          placeholder="Full name"
          autoCapitalize="words"
          textContentType="name"
        />
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
        <Input
          placeholder="Choose a password (min. 8 characters)"
          textContentType="password"
          secureTextEntry={!showPassword}
        >
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <EyeOpen color={showPassword ? '#FF9D42' : '#939393'} />
          </TouchableOpacity>
        </Input>

        <Button
          label="Register"
          onPress={handleLogin}
        />
      </View>

      <View style={styles.registerContainer}>
        <Text
          style={{ fontFamily: 'Bitter_400Regular', color: "#1E1E1E", opacity: 0.7 }}
        >
          Already have an account?
        </Text>

        <Link href="/login" style={{ color: "#FF9D42", fontFamily: 'Bitter_700Bold', fontSize: 16 }}>
          Go to login
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