import { Component, OnInit, } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  editMode: boolean = false
  bookmarks: any[] = []
  currentPageBookmarks: any[] = []
  currentPage: number = 1
  totalPages: any[] = []
  bookmarkDB: any
  newBookmarkAddedMode: boolean = false

  constructor() {
    const DBOpenRequest = window.indexedDB.open('bookmarkList', 8)
    DBOpenRequest.onsuccess = () => {
      this.bookmarkDB = DBOpenRequest.result
      this.getList()
    };
    DBOpenRequest.onupgradeneeded = () => {
      this.bookmarkDB = DBOpenRequest.result
      // Create an objectStore for this database //
      const objectStore = this.bookmarkDB.createObjectStore('bookmarkList', {keyPath: "bookmarkList"} )
      // Define the data items for the objectStore to contain //
      objectStore.createIndex('name', 'name', { unique: false })
      objectStore.createIndex('link', 'link', { unique: false })
    };
   }
  ngOnInit(): void {
  }
  getList(){
    const transaction = this.bookmarkDB.transaction(['bookmarkList'], 'readwrite')
    const objectStore = transaction.objectStore('bookmarkList')
    const objectStoreRequest = objectStore.getAll()
    objectStoreRequest.onsuccess = () => {
      this.bookmarks = objectStoreRequest.result
      this.currentPageBookmarks = this.bookmarks.slice(0,21)
      this.totalPages = new Array(Math.ceil(this.bookmarks.length / 20))
    }
  }
  // script uses actual page numbers not indexes
  changePage(page: number){
    var startingIndex: number
    if (page > 1){
      startingIndex = ((page - 1) * 20) + 1
    } else {
      startingIndex = 1
    }
    this.currentPageBookmarks = this.bookmarks.slice(startingIndex, startingIndex + 20)
    this.currentPage = page
  }
  addNewBookmarkToDatabase(newBookmark: any) {
    // set new bookmark unique key to the name initially
    newBookmark.bookmarkList = newBookmark.name
    const transaction = this.bookmarkDB.transaction(['bookmarkList'], 'readwrite')
    const objectStore = transaction.objectStore('bookmarkList')
    const objectStoreRequest = objectStore.add(newBookmark)
    objectStoreRequest.onsuccess = () => {
      this.bookmarks.unshift(newBookmark)
      this.setSavedBookmarkMode()
    }
  }
  setSavedBookmarkMode() {
    this.newBookmarkAddedMode = true
  }
  updateBookmarkName(newName: string, key: string){
    const transaction = this.bookmarkDB.transaction(['bookmarkList'], 'readwrite')
    const objectStore = transaction.objectStore('bookmarkList')
    //get the record to be updated//
    const objectStoreRequest = objectStore.get(key)
    var editingBookmark = {} as any
    objectStoreRequest.onsuccess = () => {
      editingBookmark = objectStoreRequest.result
      editingBookmark.name = newName
      //replace the record with the updated one]]
      const updateNameRequest = objectStore.put(editingBookmark)
      updateNameRequest.onsuccess = () => {
        this.getList();
      }
    }
  }
  updateBookmarkLink(newLink: string, key: string){
    const transaction = this.bookmarkDB.transaction(['bookmarkList'], 'readwrite')
    const objectStore = transaction.objectStore('bookmarkList')
    //get the record to be updated//
    const objectStoreRequest = objectStore.get(key)
    var editingBookmark = {} as any
    objectStoreRequest.onsuccess = () => {
      editingBookmark = objectStoreRequest.result
      editingBookmark.name = newLink
      //replace the record with the updated one]]
      const updateLinkRequest = objectStore.put(editingBookmark)
      updateLinkRequest.onsuccess = () => {
        this.getList();
      }
    }
  }
  deleteBookmark(key: string){
    const transaction = this.bookmarkDB.transaction(['bookmarkList'], 'readwrite')
    const objectStore = transaction.objectStore('bookmarkList')
    //get the record to be updated//
    const objectStoreRequest = objectStore.delete(key)
    objectStoreRequest.onsuccess = () => {
      this.getList()
    }
  }
  editModeOn(){
    this.editMode = true
  }
  editModeOff(){
    this.editMode = false
  }
  trackByFn(index: any) {
    return index;
  }
}
