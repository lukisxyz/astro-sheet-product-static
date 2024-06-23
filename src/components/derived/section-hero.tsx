import useSWR from "swr";
import { ProductCard, type ProductProps } from "./product-card";
import { PaginationProduct } from "./pagination-product";
import ProductCardSkeleton from "./product-card-skeleton";
import { Button } from "../ui/button";

const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());

export default function SectionHero({ uri }: { uri: string }) {
    uri = `${uri}?type=marketings`;

    const { data, error, isLoading } = useSWR<
        {
            marketing: {
                heroImage: Array<string>;
            };
            data: Array<ProductProps>;
        },
        Error
    >(uri, fetcher);

    const handleOpenProductDetail = (data: ProductProps) => {
        const encodedData = btoa(JSON.stringify(data));
        window.location.href = `/product/detail?data=${encodedData}`;
    };

    return (
        <>
            <div className="relative overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center h-96 sm:h-[480px] bg-gray-200 rounded">
                        <img alt="loading" src="/assets/images/spinner.svg" />
                    </div>
                ) : (
                    <img className="w-full object-cover h-96 sm:h-[480px] rounded-xl"
                        src={data.marketing.heroImage[0]}
                        alt="Hero"
                    />
                )}
            </div >
            {
                isLoading ? (
                    <>
                        <br />
                        <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                ) : (
                    <>
                        <br />
                        <br />
                        <h1 className="mt-4 sm:mt-8 text-center block text-xl sm:text-3xl font-bold leading-6 text-gray-800">
                            Produk Unggulan Kami
                        </h1>
                        <br />
                        <br />
                        <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {data.data.map((v) => (
                                <li key={v.sku}>
                                    <ProductCard
                                        {...v}
                                        callbackClickProduct={() => handleOpenProductDetail(v)}
                                    />
                                </li>
                            ))}
                        </ul>
                        <br />
                        <br />
                        <div className="text-center">
                            <Button onClick={() => { window.location.href = "/product" }} className="text-lg h-16" size="lg" variant="outline">Temukan Produk Lain</Button>
                        </div>
                        <br />
                    </>
                )
            }
            <br />
        </>
    );
}
