import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import BookList from '../components/BookList';
import BookDetailsPage from './BookDetailsPage';
import Menu from '../components/Menu';

const BooksListPage = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('Galeria de Fotos');

  useEffect(() => {
    fetch('https://t3t4-dfe-pb-grl-m1-default-rtdb.firebaseio.com/books.json')
      .then(response => response.json())
      .then(data => {
        const booksArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setBooks(booksArray);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  const handleBookPress = book => {
    setSelectedBook(book);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
  };

  const handleUserPress = () => {
    navigation.navigate('PhotosPage', { userId: loggedInUser });
  };

  return (
    <View style={styles.container}>
      <Menu />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={handleUserPress}>
          <Text style={styles.userText}>{loggedInUser}</Text>
        </TouchableOpacity>

        {showDetails ? (
          <BookDetailsPage book={selectedBook} onBack={handleBackToList} />
        ) : (
          <View>
            <Text style={styles.title}>Lista de Livros</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite para filtrar..."
              value={filter}
              onChangeText={text => setFilter(text)}
            />
            <BookList
              books={books.filter(
                book =>
                  book.title.toLowerCase().includes(filter.toLowerCase()) ||
                  book.author.toLowerCase().includes(filter.toLowerCase())
              )}
              handleBookPress={handleBookPress}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center',
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
    color: 'blue',
  },
});

export default BooksListPage;
