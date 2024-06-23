import useSWR from "swr";
import { ProductCard, type ProductProps } from "./product-card";
import { PaginationProduct } from "./pagination-product";
import ProductCardSkeleton from "./product-card-skeleton";
import { useState } from "react";
import ProductDetail from "./product-detail";

const fetcher = (url: RequestInfo | URL) =>
	fetch(url).then((res) => res.json());

export default function ProductList({ uri }: { uri: string }) {
	const urlString = window.location.search;
	const urlParams = new URLSearchParams(urlString);

	uri = urlParams.get("start")
		? `${uri}?next=${urlParams.get("start")}&type=products`
		: `${uri}?type=products`;

	const { data, error, isLoading } = useSWR<
		{
			url: { next: string | null; prev: string | null };
			data: Array<ProductProps>;
		},
		Error
	>(uri, fetcher);

	const handleOpenProductDetail = (data: ProductProps) => {
		const encodedData = btoa(JSON.stringify(data))
		window.location.href = `/product/detail?data=${encodedData}`;
	}

	if (error)
		return (
			<div className="absolute left-1/2 top-1/4 -translate-x-1/2">
				<p className="mt-3 text-center text-gray-600">Terjadi kesalahan.</p>
				<div className="mt-5 flex flex-col justify-center items-center w-full">
					<a
						className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-800 text-white hover:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none"
						href="/"
					>
						<svg
							className="flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<title>Error happen</title>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Kembali ke halaman sebelumnya
					</a>
				</div>
			</div>
		);
	if (isLoading)
		return (
			<>
				<br />
				<ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
					<ProductCardSkeleton />
				</ul>
				<br />
				<br />
			</>
		);
	return data.data.length === 0 ? (
		<>
			<div className="absolute left-1/2 top-1/4 -translate-x-1/2">
				<p className="mt-3 text-center text-gray-600">
					Maaf, product yang anda cari tidak ditemukan.
				</p>
				<div className="mt-5 flex flex-col justify-center items-center w-full">
					<a
						className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-800 text-white hover:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none"
						href={data.url.prev}
					>
						<svg
							className="flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<title>Not found</title>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Kembali ke halaman sebelumnya
					</a>
				</div>
			</div>
		</>
	) :
		<>
			<br />
			<ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{data.data.map((v) => (
					<li key={v.sku}>
						<ProductCard {...v} callbackClickProduct={() => handleOpenProductDetail(v)} />
					</li>
				))}
			</ul>
			<br />
			<br />
			<PaginationProduct
				next={`product${data.url.next}`}
				prev={`product${data.url.prev}`}
			/>
		</>
}
