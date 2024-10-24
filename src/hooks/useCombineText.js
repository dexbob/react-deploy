export default function useCombineText() {
	return (text, org, dst) => {
		return text?.trim().replaceAll(org, dst);
	};
}
