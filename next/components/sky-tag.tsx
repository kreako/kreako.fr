type SkyTagProps = {
  title: string
}

export default function SkyTag({ title }: SkyTagProps) {
  return <span className="before:content-['#'] before:text-xs before:text-sky-300">{title}</span>
}
