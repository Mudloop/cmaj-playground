import { readFileSync } from "fs";
export const icon = (name: string) => readFileSync(import.meta.resolve(`../../assets/icons/${name}.svg`).replace('file://', ''), 'utf8')