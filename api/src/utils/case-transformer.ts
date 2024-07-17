export function toCamelCase(snakeCase: string): string {
  return snakeCase.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
}

export function toSnakeCase(camelCase: string): string {
  return camelCase.replace(/([A-Z])/g, "_$1").toLowerCase();
}
