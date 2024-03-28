import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import app from './firebaseConfig';

const uploadImage = async (imageUri, userId) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `user_images/${userId}/${Date.now()}`);
  const response = await fetch(imageUri);
  const blob = await response.blob();
  await uploadBytes(storageRef, blob);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};

const getUserImages = async (userId) => {
  const storage = getStorage(app);
  const userImagesRef = ref(storage, `user_images/${userId}`);
  const images = [];
  
  try {
    const listResult = await listAll(userImagesRef);
    await Promise.all(listResult.items.map(async (itemRef) => {
      const imageUrl = await getDownloadURL(itemRef);
      images.push({ id: itemRef.name, imageUrl });
    }));
  } catch (error) {
    console.error('Erro ao obter imagens do usuário:', error);
    throw error;
  }
  
  return images;
};

export { uploadImage, getUserImages };

