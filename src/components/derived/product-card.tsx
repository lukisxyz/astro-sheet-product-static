import { formatToRupiah } from "@/lib/currency";
import { useState } from "react";

export type ProductProps = {
	name: string;
	description: string;
	price: number;
	image: string;
	id: number;
	sku: string;
};

type ProductCardProps = ProductProps & {
	callbackClickProduct: () => void
};

export function ProductCard(props: ProductCardProps) {
	const [isLoaded, setLoaded] = useState<boolean>(false);
	const [isError, setError] = useState<boolean>(false);

	const phoneNumber = "6282134421528";
	const sendWhatsapp = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=Hai%2C+saya+ingin+memesan+product+ini%3A%0A%0ASKU%3A+${props.sku}%0ANama%3A+${props.name}%0A%0AApakah+barang+masih+tersedia?&type=phone_number&app_absent=0`;

	const handleClickProduct = () => {
		props.callbackClickProduct();
	}

	return (
		<div onClick={handleClickProduct} onKeyDown={handleClickProduct} role="button" className="relative flex w-full max-w-md h-96 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:ring-4 hover:cursor-pointer hover:ring-blue-200 duration-300">
			<div className="relative flex h-56 overflow-hidden">
				{!isLoaded && (
					<div className="absolute left-0 top-0 flex items-center justify-center w-full h-full bg-gray-300 rounded">
						<svg
							className="w-10 h-10 text-gray-200"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 18"
						>
							<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
						</svg>
					</div>
				)}
				{isError && (
					<img
						className="object-cover z-10 absolute left-0 top-0 h-full w-full"
						alt="not found"
						src="/assets/images/not-found.avif"
					/>
				)}
				<img
					loading="lazy"
					className={`object-cover w-full ${!isLoaded ? "invisible" : "visible"
						}`}
					src={props.image}
					alt={props.description}
					onLoad={() => {
						setLoaded(true);
					}}
					onError={() => {
						setError(true);
					}}
					aria-describedby={props.sku}
				/>
			</div>
			<div className="mt-3 px-3 pb-3">
				<h5
					id={props.sku}
					className="text-base tracking-tight text-slate-600 text-nowrap block w-full overflow-hidden text-ellipsis"
					title={props.name}
				>
					{props.name}
				</h5>
				<div className="mt-2 mb-4 flex items-center justify-between">
					<p>
						<span className="text-2xl font-bold text-slate-700">
							{formatToRupiah(props.price)}
						</span>
					</p>
				</div>
				<div className="absolute left-0 bottom-4 px-3 w-full">
					<a
						href={sendWhatsapp}
						title="Pesan via whatsapp"
						aria-label="Pesan via whatsapp"
						className="flex items-center justify-center border shadow-sm text-[#075E54] flex-shrink-0 h-11 rounded-md w-full text-center text-base font-medium hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-green-300 gap-3"
						target="_blank"
						rel="noreferrer"
					>
						<img alt="whatsapp icon" className="h-7 w-7" src="/assets/images/whatsapp.svg" />
						<span>Pesan via whatsapp</span>
					</a></div>
			</div>
		</div>
	);
}
