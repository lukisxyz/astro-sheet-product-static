import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationProduct({
    next, prev
}: {
    next: string, prev: string
}) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className={prev ? "" : "bg-gray-200 pointer-events-none cursor-not-allowed"} href={prev} size="lg" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className={next ? "" : "bg-gray-200 pointer-events-none cursor-not-allowed"} href={next} size="lg" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
