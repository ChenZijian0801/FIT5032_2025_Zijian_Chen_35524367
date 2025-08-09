
<template>
  <div class="booklist-container mt-4">
    <h3>Book List</h3>
    
    <div class="mb-3 d-flex flex-wrap gap-2">
      <button @click="selectQuery('all')" 
              :class="{'btn-primary': currentQueryType === 'all', 'btn-outline-primary': currentQueryType !== 'all'}" 
              class="btn btn-sm">All Books</button>
      <button @click="selectQuery('isbnGreater1000')" 
              :class="{'btn-primary': currentQueryType === 'isbnGreater1000', 'btn-outline-primary': currentQueryType !== 'isbnGreater1000'}" 
              class="btn btn-sm">ISBN &gt; 1000</button>
      <button @click="selectQuery('sortedByAuthorAsc')" 
              :class="{'btn-primary': currentQueryType === 'sortedByAuthorAsc', 'btn-outline-primary': currentQueryType !== 'sortedByAuthorAsc'}" 
              class="btn btn-sm">Sort by Author (Asc)</button>
      <button @click="selectQuery('limit5Newest')" 
              :class="{'btn-primary': currentQueryType === 'limit5Newest', 'btn-outline-primary': currentQueryType !== 'limit5Newest'}" 
              class="btn btn-sm">5 Newest Books</button>
      <button @click="selectQuery('specificPublisher')" 
              :class="{'btn-primary': currentQueryType === 'specificPublisher', 'btn-outline-primary': currentQueryType !== 'specificPublisher'}" 
              class="btn btn-sm">Publisher 'Del Rey'</button>
      <button @click="selectQuery('publicationYearRange')" 
              :class="{'btn-primary': currentQueryType === 'publicationYearRange', 'btn-outline-primary': currentQueryType !== 'publicationYearRange'}" 
              class="btn btn-sm">Year 1900-2000</button>
    </div>

    <div v-if="loading" class="text-center text-muted py-3">Loading books...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    
    <ul v-if="books.length > 0 && !loading" class="list-unstyled">
      <li v-for="book in books" :key="book.id" class="book-item card mb-2 p-3 shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <strong>{{ book.name }}</strong> by {{ book.author }}<br>
            <small class="text-muted">
              ISBN: {{ book.isbn || 'N/A' }} | 
              Publisher: {{ book.publisher || 'N/A' }}, 
              Year: {{ book.publicationYear || 'N/A' }}
            </small>
          </div>
          <div>
            <button @click="startEdit(book)" class="btn btn-sm btn-info me-2">Edit</button>
            <button @click="deleteBook(book.id)" class="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>

        <div v-if="currentEditBook && currentEditBook.id === book.id" class="mt-3 p-3 border rounded bg-light">
          <h5>Edit Book</h5>
          <form @submit.prevent="updateBook">
            <div class="mb-2">
              <label for="editName" class="form-label">Name:</label>
              <input type="text" id="editName" class="form-control form-control-sm" v-model="currentEditBook.name" required>
            </div>
            <div class="mb-2">
              <label for="editAuthor" class="form-label">Author:</label>
              <input type="text" id="editAuthor" class="form-control form-control-sm" v-model="currentEditBook.author" required>
            </div>
            <div class="mb-2">
              <label for="editIsbn" class="form-label">ISBN:</label>
              <input type="text" id="editIsbn" class="form-control form-control-sm" v-model="currentEditBook.isbn">
            </div>
            <div class="mb-2">
              <label for="editPublisher" class="form-label">Publisher:</label>
              <input type="text" id="editPublisher" class="form-control form-control-sm" v-model="currentEditBook.publisher">
            </div>
            <div class="mb-2">
              <label for="editPublicationYear" class="form-label">Year:</label>
              <input type="number" id="editPublicationYear" class="form-control form-control-sm" v-model.number="currentEditBook.publicationYear" min="0" max="2100">
            </div>
            <button type="submit" class="btn btn-sm btn-success me-2">Save</button>
            <button type="button" @click="cancelEdit" class="btn btn-sm btn-secondary">Cancel</button>
          </form>
        </div>
      </li>
    </ul>
    <div v-if="!loading && !error && books.length === 0" class="text-muted py-3">
      No books found matching the current criteria.
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'; // Import ref, onMounted, onUnmounted for reactivity and lifecycle hooks
import { db } from '../firebase/init'; // Import the Firestore database instance

// Import Firestore functions for querying, updating, and deleting documents
import { collection, query, where, orderBy, limit, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'; 

export default {
  name: 'Booklist', // Component name
  setup() {
    // Reactive state variables
    const books = ref([]); // Array to store fetched book data
    const loading = ref(true); // Loading state indicator
    const error = ref(null); // Stores any error messages
    const currentEditBook = ref(null); // Holds the data of the book currently being edited
    const currentQueryType = ref('all'); // Tracks the currently active query type (for button styling)
    const unsubscribe = ref(null); // Stores the unsubscribe function from the Firestore real-time listener

    /**
     * Initiates a real-time listener for book data based on the selected query type.
     * @param {string} queryType - The type of query to execute.
     */
    const selectQuery = (queryType) => {
      // If there's an active listener, unsubscribe from it first to prevent memory leaks
      if (unsubscribe.value) {
        unsubscribe.value();
        unsubscribe.value = null; // Clear the old subscription
      }

      currentQueryType.value = queryType; // Update the current query type for UI feedback
      loading.value = true; // Set loading to true
      error.value = null; // Clear any previous errors

      let q; // Variable to hold the Firestore query object
      const booksCollectionRef = collection(db, 'books'); // Reference to the 'books' collection

      // Define the query based on the selected queryType
      switch (queryType) {
        case 'isbnGreater1000':
          // Query: Books where 'isbn' field is greater than '1000' (string comparison)
          // Note: If ISBNs are meant to be numbers and compared numerically,
          // they should be stored as Number type in Firestore.
          q = query(booksCollectionRef, where('isbn', '>', '1000'));
          break;
        case 'sortedByAuthorAsc':
          // Query: All books sorted by 'author' in ascending order
          q = query(booksCollectionRef, orderBy('author', 'asc'));
          break;
        case 'limit5Newest':
          // Query: The 5 newest books, sorted by 'createdAt' in descending order
          // Ensure your book documents have a 'createdAt' field of type Timestamp (generated by new Date())
          q = query(booksCollectionRef, orderBy('createdAt', 'desc'), limit(5));
          break;
        case 'specificPublisher':
          // Query: Books from a specific publisher, sorted by name
          // Example: 'Del Rey'. Ensure your documents have a 'publisher' field.
          q = query(booksCollectionRef, where('publisher', '==', 'Del Rey'), orderBy('name', 'asc'));
          break;
        case 'publicationYearRange':
          // Query: Books published between 1900 and 2000 (inclusive)
          // Ensure 'publicationYear' is stored as a Number type in Firestore.
          // For range queries, you must order by the field you are filtering on.
          q = query(booksCollectionRef, 
                    where('publicationYear', '>=', 1900),
                    where('publicationYear', '<=', 2000),
                    orderBy('publicationYear', 'asc') 
                   );
          break;
        case 'all':
        default:
          // Default query: All books, sorted by 'name' in ascending order (optional sort)
          q = query(booksCollectionRef, orderBy('name', 'asc')); 
          break;
      }

      // --- Attach a real-time listener (onSnapshot) to the query ---
      // This listener will automatically update 'books' whenever there are changes in Firestore
      unsubscribe.value = onSnapshot(q, (snapshot) => {
        const booksArray = [];
        snapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() }); // Add document ID and data to the array
        });
        books.value = booksArray; // Update the reactive 'books' array
        loading.value = false; // Set loading to false
        error.value = null; // Clear any previous errors
        console.log('Real-time update received for query:', queryType);
      }, (err) => {
        // Error handler for the real-time listener
        console.error('Real-time query error:', err);
        error.value = 'Error fetching real-time books: ' + err.message;
        loading.value = false;
      });
    };

    // --- CRUD Operations: Update ---

    /**
     * Sets the selected book into the edit state, displaying the edit form.
     * @param {object} book - The book object to be edited.
     */
    const startEdit = (book) => {
      // Create a shallow copy of the book data to prevent direct mutation of the list data
      currentEditBook.value = { ...book }; 
    };

    /**
     * Cancels the current edit operation and hides the edit form.
     */
    const cancelEdit = () => {
      currentEditBook.value = null; 
    };

    /**
     * Updates a book document in Firestore with the new data from the edit form.
     */
    const updateBook = async () => {
      if (!currentEditBook.value || !currentEditBook.value.id) return; // Ensure a book is selected for edit

      // Basic validation for publication year (consistent with AddBookView)
      if (currentEditBook.value.publicationYear !== null && 
          (currentEditBook.value.publicationYear < 0 || currentEditBook.value.publicationYear > 2100)) {
        alert('Publication year must be between 0 and 2100.');
        return;
      }

      try {
        // Get a reference to the specific document in Firestore
        const bookRef = doc(db, 'books', currentEditBook.value.id);
        
        // Update the document with the fields from currentEditBook.
        // updateDoc only updates the fields provided; others remain unchanged.
        await updateDoc(bookRef, {
          name: currentEditBook.value.name,
          author: currentEditBook.value.author,
          isbn: currentEditBook.value.isbn,
          publisher: currentEditBook.value.publisher,
          publicationYear: currentEditBook.value.publicationYear,
          updatedAt: new Date() // Add an 'updatedAt' timestamp
        });
        console.log('Book updated successfully:', currentEditBook.value.id);
        
        // Since onSnapshot is used, the list will automatically update in real-time.
        // No need to manually call selectQuery() here.
        currentEditBook.value = null; // Hide the edit form
      } catch (e) {
        console.error('Error updating book:', e);
        error.value = 'Error updating book: ' + e.message;
      }
    };

    // --- CRUD Operations: Delete ---

    /**
     * Deletes a book document from Firestore.
     * @param {string} id - The ID of the book document to delete.
     */
    const deleteBook = async (id) => {
      // Confirmation dialog before deleting
      if (!confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
        return; 
      }
      try {
        // Get a reference to the specific document and delete it
        await deleteDoc(doc(db, 'books', id));
        console.log('Book deleted successfully:', id);
        
        // Since onSnapshot is used, the list will automatically update in real-time.
        // No need to manually call selectQuery() here.
      } catch (e) {
        console.error('Error deleting book:', e);
        error.value = 'Error deleting book: ' + e.message;
      }
    };

    // --- Lifecycle Hooks ---

    // When the component is mounted to the DOM, start the real-time listener
    onMounted(() => {
      selectQuery('all'); // Default to displaying all books initially
    });

    // When the component is unmounted, unsubscribe from the real-time listener
    // This prevents memory leaks and unnecessary background operations.
    onUnmounted(() => {
      if (unsubscribe.value) {
        unsubscribe.value(); 
      }
    });

    // --- Expose reactive state and methods to the template ---
    return {
      books,
      loading,
      error,
      currentEditBook,
      currentQueryType, 
      startEdit,
      cancelEdit,
      updateBook,
      deleteBook,
      selectQuery, // Expose the query selection function
    };
  },
};
</script>

<style scoped>
/* Scoped CSS for the Booklist component */
.booklist-container {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.book-item {
  margin-bottom: 10px;
  /* Additional styling is provided by Bootstrap classes like .card, .p-3, .shadow-sm */
}

/* You can uncomment or add more custom styles here if needed */
/* .book-item:last-child {
  border-bottom: none;
} */
</style>
