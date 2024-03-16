import { Skeleton } from '@/components/ui/skeleton'

const list = new Array(5).fill('')

export function ListReposSkeleton() {
  console.log('lists skeleton', list.length)
  return (
    <ul className="flex flex-col gap-2">
      {list.map((_, index) => (
        <li
          key={`list-repos-skeleton-${index}`}
          className="flex flex-col gap-2 border-t py-2"
        >
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[250px]" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </li>
      ))}
    </ul>
  )
}
