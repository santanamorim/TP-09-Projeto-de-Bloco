import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUser = async (email, password) => {
  try {
    await AsyncStorage.setItem(email, password);
    return 'Usuário cadastrado com sucesso!';
  } catch (error) {
    return 'Erro ao salvar usuário:';
  }
};

const checkUser = async (email, password) => {
  try {
    const savedPassword = await AsyncStorage.getItem(email);
    if (savedPassword === password) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
    return false;
  }
};

export { saveUser, checkUser };

