import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  async assignRating({rating,bookId}){
    const callableAssignRating = await this.functions.httpsCallable('assignRating')
    return await callableAssignRating({rating,bookId})
  }

  async postComment({text,bookId}){
    const callablePostComment = this.functions.httpsCallable('postComment')
    return await callablePostComment({text,bookId})
  }

   createAuthor ({authorName}){
    const callableCreateAuthor = this.functions.httpsCallable('createAuthor')
    return callableCreateAuthor({authorName})
  }

  async createBook (book){
    console.log(book)
    const callableCreateBook = this.functions.httpsCallable('createBook')
    return callableCreateBook(book)
  }

  getAuthors(){
    return this.db.collection('authors').get()
  }

  getUserRating(userId){
    return this.db.collection('publicProfiles')
    .where('userId','==',userId)
    .limit(1).get()
  }

  getUserProfile ({userId,onSnapshot}){
    this.db.collection('publicProfiles')
           .where('userId','==',userId)
           .limit(1)
           .onSnapshot(onSnapshot)
    // return this.db.collection('publicProfiles')
    //               .where('userId','==',userId)
    //               .get();
  }

  subscribeToBookComments ({bookId,onSnapshot}){
    const bookRef = this.db.collection('books').doc(bookId)
    return this.db.collection('comments')
    .where('bookRef','==',bookRef)
    .orderBy('dateCreated','desc')
    .onSnapshot(onSnapshot)
  }
  
  subscribeToBookRating({bookId,onSnapshot}){
  this.db.collection('ratings').doc(bookId).onSnapshot(onSnapshot)

}

  getRatings(bookId){
    return this.db.collection('ratings').doc(bookId).get()
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  async register({email,password,userName}){
    await this.auth.createUserWithEmailAndPassword(email, password);
    const createUserCallable = this.functions.httpsCallable('createPublicProfile')
    return createUserCallable({userName})
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
