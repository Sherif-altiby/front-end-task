import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Logo Icon */}
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
        S
      </div>

      {/* Brand Name */}
      <span className="text-xl font-semibold tracking-tight">
        STORE
      </span>
    </Link>
  );
}