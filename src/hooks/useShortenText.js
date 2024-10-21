export default function useShortenText() {
	return (text, size) => {
		return text?.length > size ? text.slice(0, size) + "..." : text;
	};
}
