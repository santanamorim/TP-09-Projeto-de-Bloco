import { View, Text, StyleSheet } from 'react-native';

const Menu = () => {
  return (
    <View style={styles.nav}>
      <Text>Home</Text>
      <Text>Lista de Livros</Text>
      <Text>Sobre</Text>
      <Text>Contato</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#bdbdbd',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
});

export default Menu;

