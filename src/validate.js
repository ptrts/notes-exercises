export default function validate(expression, message) {
    if (!expression) {
        throw new Error(message);
    }
}
