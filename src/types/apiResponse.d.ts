declare interface ApiResponse {
  code: number;
  data: object;
  msg: string;
}

declare interface Result<T>{
  code:number;
  data:T;
  msg:string;
}