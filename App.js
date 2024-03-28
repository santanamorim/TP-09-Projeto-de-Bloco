import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import Authentication from './components/Authentication';
import BooksListPage from './pages/BooksListPage';
import PhotosPage from './pages/PhotosPage';

const Stack = createStackNavigator();

const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const handleLogin = (email) => {
    setAuthenticatedUser(email);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {authenticatedUser ? (
            <Stack.Screen name="BooksList" component={BooksListPage} />
          ) : (
            <Stack.Screen name="Authentication">
              {props => <Authentication {...props} onLogin={handleLogin} />}
            </Stack.Screen>
          )}
          <Stack.Screen name="PhotosPage" component={PhotosPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;