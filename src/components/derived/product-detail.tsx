import { formatToRupiah } from "@/lib/currency";
import type { ProductProps } from "./product-card";

export default function ProductDetail() {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);

    const data = JSON.parse(atob(urlParams.get("data"))) as ProductProps;

    if (!data.id)
        return (
            <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
                <p className="mt-3 text-center text-gray-600">Terjadi kesalahan.</p>
                <div className="mt-5 flex flex-col justify-center items-center w-full">
                    <button
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-800 text-white hover:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => { history.back() }}
                        type="button"
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
                    </button>
                </div>
            </div>
        );

    const phoneNumber = "6282134421528";
    const sendWhatsapp = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=Hai%2C+saya+ingin+memesan+product+ini%3A%0A%0ASKU%3A+${data.sku}%0ANama%3A+${data.name}%0A%0AApakah+barang+masih+tersedia?&type=phone_number&app_absent=0`;
    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 my-4 sm:my-8">
            <div className="relative border overflow-hidden border-gray-300 rounded-md bg-white shadow-md h-[400px] w-full">
                <img
                    className="object-cover h-full w-full"
                    src={data.image}
                    alt={data.description}
                />
            </div>
            <div className="p-4 relative pb-32">
                <h2 className="font-semibold text-3xl leading-tight text-gray-800">
                    {data.name}
                </h2>
                <span className="text-sm font-light text-gray-600">Sku: </span>
                <span className="text-sm text-green-600">{data.sku}</span>
                <br />
                <p className="font-bold text-5xl mt-5 text-gray-800">
                    {formatToRupiah(data.price)}
                </p>
                <br />
                <p className="text-gray-500 text-lg">{data.description}</p>

                <div className="absolute left-0 bottom-4 px-3 w-full">
                    <a
                        href={sendWhatsapp}
                        title="Pesan via whatsapp"
                        aria-label="Pesan via whatsapp"
                        className="flex items-center justify-center border-2 shadow-sm text-[#075E54] flex-shrink-0 h-12 border-[#075e54b0] rounded-md w-full text-center text-base font-medium hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-green-300 gap-3"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            alt="whatsapp icon"
                            className="h-7 w-7"
                            src="/assets/images/whatsapp.svg"
                        />
                        <span>Pesan via whatsapp</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
