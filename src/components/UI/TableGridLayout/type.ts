export interface Field {
  key: string;
  label: string | any;
  align?: "center" | "left" | "right";
  render?: (value: any, item: any) => React.ReactNode;
  sort?: boolean;
}
