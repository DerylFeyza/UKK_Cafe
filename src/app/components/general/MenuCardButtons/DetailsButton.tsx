export default function DetailsButton({
	setIsModalOpen,
}: {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const toggleModal = () => setIsModalOpen(true);

	return (
		<div>
			<button
				onClick={toggleModal}
				className="button-transition rounded-full px-4 py-2 flex items-center space-x-2"
				aria-label="Add to cart"
			>
				<span className="font-semibold">Details</span>
			</button>
		</div>
	);
}
