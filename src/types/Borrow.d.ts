declare type BookCirculateType ={
    id:number,
    book_id:number,
    cover:string,
    book_name:string,
    borrow_date:string,
    expired_date:string,
    is_agree:number
  }


declare type BookHistoryType ={
    book_id:number,
    cover:string,
    book_name:string,
    author:string,
    category:string,
    press:string,
    borrow_date:string,
    id:number
}