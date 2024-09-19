import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function TransactionButton() {
	const [quantity, setQuantity] = useState(0);
	const incrementQuantity = () => setQuantity((prev) => prev + 1);
	const decrementQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));

	const handleCartClick = () => {
		setQuantity(1);
	};

	return (
		<div className="h-10 flex items-center">
			{quantity > 0 ? (
				<div className="flex items-center bg-primary rounded-full overflow-hidden">
					<button
						onClick={decrementQuantity}
						className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
						aria-label="Decrease quantity"
					>
						<Minus size={20} />
					</button>
					<span
						className="font-bold text-white w-8 text-center"
						aria-live="polite"
						aria-atomic="true"
					>
						{quantity}
					</span>
					<button
						onClick={incrementQuantity}
						className="px-3 py-2 text-white hover:bg-orange-600 transition-colors"
						aria-label="Increase quantity"
					>
						<Plus size={20} />
					</button>
				</div>
			) : (
				<button
					onClick={handleCartClick}
					className="button-transition rounded-full px-4 py-2 flex items-center space-x-2"
					aria-label="Add to cart"
				>
					<ShoppingCart size={20} />
					<span className="font-semibold">Add</span>
				</button>
			)}
		</div>
	);
}
