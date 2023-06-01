export type CompilerResponse = {
  bytecode: string;
  hash: string;
  errors: CompilerError[];
};

export type CompilerError = {
  msg: string;
  code: string;
};
