import { Filter } from "bad-words";
import linkifyIt from "linkify-it";
import { profinityRegex } from "../utils/profinityRegex";

const filter = new Filter();
const linkify = new linkifyIt();

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export function validateContent(text: string): ValidationResult {
    //проверка на маты
    if (filter.isProfane(text)) {
        return {
            valid: false,
            error: "Исппользование нецензурной лексики EN запрещено",
        };
    }
    if (profinityRegex.test(text)) {
        return {
            valid: false,
            error: "Исппользование нецензурной лексики RU запрещено",
        };
    }
    //проверка на ссылки
    const links = linkify.match(text);

    if (links && links.length > 0) {
        return { valid: false, error: "Ссылки в тексте недопустимы" };
    }
    return { valid: true };
}
