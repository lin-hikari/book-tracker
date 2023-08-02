export class User {
  name: string
  books: Book[]

  constructor(name: string){
    this.name = name;
  }
}

interface Book {
  title: string
  pageTotal: number
  pageCurrent: number
}