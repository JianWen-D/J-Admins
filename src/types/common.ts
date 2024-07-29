export interface ApiResultProps<T> {
  code: "0" | string;
  data: T;
  msg: string;
}
