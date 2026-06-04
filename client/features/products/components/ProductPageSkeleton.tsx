 
const ProductPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-background py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* IMAGE SKELETON */}
                <div className="h-[420px] rounded-2xl bg-muted animate-pulse" />

                {/* CONTENT SKELETON */}
                <div className="space-y-6">

                    <div className="h-6 w-24 bg-muted rounded animate-pulse" />

                    <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />

                    <div className="h-10 w-40 bg-muted rounded animate-pulse" />

                    <div className="space-y-2">
                        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                    </div>

                    <div className="h-10 w-full bg-muted rounded animate-pulse" />
                </div>

            </div>
        </div>
    )
}

export default ProductPageSkeleton