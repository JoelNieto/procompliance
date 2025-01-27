export type ParamTable = {
  id: string;
  name: string;
  code: string;
  created_at: Date;
};

export type ParamItem = {
  id: string;
  param_table_id: string;
  name: string;
  value: number;
  created_at: Date;
};

export type Parameter = {
  id: string;
  name: string;
  value: number;
  created_at: Date;
};
