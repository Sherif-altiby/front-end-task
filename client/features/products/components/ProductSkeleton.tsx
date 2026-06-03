import { Card, CardContent } from "@/components/ui/card";

export default function ProductSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* image */}
      <div className="h-40 w-full bg-muted" />

      <CardContent className="space-y-3 p-4">
        <div className="h-4 w-2/3 bg-muted rounded" />
        <div className="h-5 w-1/3 bg-muted rounded" />

        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-5/6 bg-muted rounded" />

        <div className="h-9 w-full bg-muted rounded mt-3" />
      </CardContent>
    </Card>
  );
}