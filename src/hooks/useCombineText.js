export default function UseCombineText() {
	return (text, org, dst) => {
		return text?.trim().replaceAll(org, dst);
	};
}
