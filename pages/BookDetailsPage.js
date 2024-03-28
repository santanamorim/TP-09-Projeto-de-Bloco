import { View, Text, Button, StyleSheet } from 'react-native';

const BookDetailsPage = ({ book, onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes</Text>
      <Text style={styles.title}>{book.title}</Text>
      <Text>Autor: {book.author}</Text>
      <Text>Categoria: {book.genre}</Text>
      <Text>Avaliação: {book.rating}/5</Text>
      <Button title="Fechar" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BookDetailsPage;
