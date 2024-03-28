import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Platform } from 'react-native';
import { saveUser, checkUser } from '../services/authService';

const Authentication = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = async () => {
    try {
      const authenticated = await checkUser(email, password);
      if (authenticated) {
        onLogin(email);
      } else {
        setError('Email ou senha incorretos. Por favor, tente novamente.');
      }
    } catch (error) {
      setError('Ocorreu um erro ao realizar o login. Por favor, tente novamente mais tarde.');
      console.error('Erro ao realizar o login:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      await saveUser(email, password);
      setIsLoginForm(true);
      setError(null);
      console.log('Usuário cadastrado com sucesso!');
    } catch (error) {
      setError('Erro ao cadastrar usuário. Por favor, tente novamente.');
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        {isLoginForm ? (
          <>
            <Text style={styles.title}>Faça Login</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
          </>
        ) : (
          <>
            <Text style={styles.title}>Cadastre-se</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button style={styles.button} title="Cadastrar" onPress={handleSignUp} />
          </>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.footer}>
        <Button title={isLoginForm ? "Cadastre-se" : "Fazer Login"} onPress={toggleForm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    ...Platform.select({
      web: {
        backgroundColor: 'white',
      },
      ios: {
        backgroundColor: '#f7f7f5',
      },
      android: {
        backgroundColor: '#f7f7f5',
      },
      default: {
        backgroundColor: 'white',
      },
    })
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  footer: {
    width: '100%',
  },
  logo: {
    width: 180,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInput: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Authentication;
