interface ICustomGlobal {}

const customGlobal: ICustomGlobal = global as any;

export { customGlobal as global };
