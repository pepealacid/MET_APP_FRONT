export default function turnIntoNumber(string) {
    if (/^\d+$/.test(string)) {
        return Number(string);
    }
    return string;
}