import { StyleSheet, Text, View } from 'react-native';

import BookItem from '@/components/home/book';

const startedBooks = [
  {
    id: 'a-promised-land',
    title: 'A Promised Land',
    author: 'Barack Obama',
    coverUrl: require('@/assets/images/books/a-promised-land.png'),
    percentageRead: 46,
  },
  {
    id: 'blade-runner',
    title: 'Blade Runner',
    author: 'Philip K. Dick',
    coverUrl: require('@/assets/images/books/blade-runner.png'),
    percentageRead: 68,
  }
]

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>
          Continue reading ({startedBooks.length})
        </Text>

        <View style={styles.booksList}>
          {startedBooks.map(book => (
            <BookItem
              key={book.id}
              title={book.title}
              coverUrl={book.coverUrl}
              percentageRead={book.percentageRead}
            />
          ))}
        </View>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
  },
  section: {
    gap: 14,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Bitter_700Bold',
    color: '#1E1E1E'
  },
  booksList: {
    flexDirection: 'row',
    gap: 16,
  }
});
