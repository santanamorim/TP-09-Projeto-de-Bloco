import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BookList = ({ books, handleBookPress }) => {
  return (
    <View>
      {books.map(book => (
        <TouchableOpacity key={book.id} onPress={() => handleBookPress(book)}>
          <View style={styles.card}>
            <Image source={{ uri: book.cover }} style={styles.bookCover} />
            <View style={styles.bookDetails}>
              <Text>{book.title}</Text>
              <Text>Autor: {book.author}</Text>
              <Text>Categoria: {book.genre}</Text>
              <Text>Avaliação: {book.rating}/5</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
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

export default BookList;
