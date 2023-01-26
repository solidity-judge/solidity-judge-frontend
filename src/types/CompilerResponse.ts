export type CompilerResponse = {
  bytecode: string;
  errors: CompilerError[];
};

export type CompilerError = {
  msg: string;
  code: string;
};
