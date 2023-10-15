import Link from "next/link";

export default function HyperLink({
  children,
  href,
  className,
  uLClassName,
  bold,
}: {
  children: any;
  href: string;
  className?: string;
  uLClassName?: string;
  bold?: boolean;
}) {
  return (
    <Link
      className={`${className} ${
        bold ? "font-semibold" : "font-normal"
      } main-blue-main cursor-pointer relative group `}
      href={href}
    >
      {children}
      <div
        className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-main group-hover:w-full rounded-full transition-all duration-100 ${uLClassName}`}
      ></div>
    </Link>
  );
}
