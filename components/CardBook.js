import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const CardBook = ({ book }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: book.cover }} style={styles.bookCover} />
      <View style={styles.bookDetails}>
        <Text>{book.title}</Text>
        <Text>Autor: {book.author}</Text>
        <Text>Categoria: {book.genre}</Text>
        <Text>Avaliação: {book.rating}/5</Text>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth > 600 ? 600 : '100%',
    maxWidth: 400,
  },
  bookCover: {
    width: 100,
    height: 150,
    marginRight: 20,
    borderRadius: 4,
  },
  bookDetails: {
    flex: 1,
  },
});

export default CardBook;
