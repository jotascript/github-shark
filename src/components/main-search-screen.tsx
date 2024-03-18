import Image from 'next/image'

import { FormBite } from './form-bite'

type Props = {
  defaultUsername?: string
}

export function MainSearchScreen({ defaultUsername = '' }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <Image
        src="/shark.svg"
        alt="shark Logo"
        width={500}
        height={290}
        priority
      />
      <FormBite defaultUsername={defaultUsername} />
    </div>
  )
}
