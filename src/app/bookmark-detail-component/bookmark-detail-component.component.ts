import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-bookmark-detail-component',
  templateUrl: './bookmark-detail-component.component.html',
  styleUrls: ['./bookmark-detail-component.component.css']
})

export class BookmarkDetailComponentComponent implements OnInit{
  @Input() name = ""
  @Input() link = ""
  @Input() bookmarkKey = ""
  @Output() nameChange = new EventEmitter<string>()
  @Output() linkChange = new EventEmitter<string>()
  //key that identifies specific bookmark entry being edited//
  @Output() editingLink = new EventEmitter<string>()
  @Output() deleteBookmark = new EventEmitter<string>()
  newName: string = "Name"
  newLink: string = "URL"
  @Output() submitNewBookmark = new EventEmitter<{name: string, link: string}>()
  @Input() editMode = false
  @Input() newMode = false
  successDisplay: boolean = false
  successMessage: string = "Thank you for submitting a bookmark"
  errorDisplay: boolean = false
  errorMessage: string = ""

  constructor() { }
  ngOnInit(): void { }
  addNewBookmark(){
    //check if the url is valid before submitting//
    try {
      const url = new URL(this.newLink)
      this.submitNewBookmark.emit({name: this.newName, link: this.newLink})
      this.successMessage = "Thank you, your bookmark has been added"
      this.errorDisplay = false
      this.successDisplay = true
      this.newName = "Name"
      this.newLink = "URL"
    }
    catch(e) {
      this.errorMessage = "Please input a proper URL"
      this.successDisplay = false
      this.errorDisplay = true
    }
  }

  successDisplayOff(){
    this.successDisplay = false
  }
  submitDeleteBookmark(){
    this.deleteBookmark.emit(this.bookmarkKey)
  }
  //fire event upon change in details to pass data to the parent component//
  nameEdit(event: Event){
    const updatedValue = event as any
    //console.log(event)
    this.nameChange.emit(updatedValue)
    this.editingLink.emit(this.bookmarkKey)
  }
  linkEdit(event: Event){
    const updatedValue = event as any
    //console.log(event)
    this.linkChange.emit(updatedValue)
    this.editingLink.emit(this.bookmarkKey)
  }
}
