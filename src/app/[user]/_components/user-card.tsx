import Image from 'next/image'

import { UserData } from '@/types/user'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { EnvelopeClosedIcon, PersonIcon } from '@radix-ui/react-icons'

type Props = {
  userData: UserData
}

export function UserCard({ userData }: Props) {
  return (
    <Card className="w-full max-w-96 h-min">
      <CardHeader className="flex flex-col gap-4 justify-center">
        <Image
          src={userData.avatar_url}
          width={254}
          height={254}
          alt={userData.name}
          className="rounded-full self-center"
        />
        <div className="flex flex-col gap-0">
          <div className="font-bold">{userData.name}</div>
          <div className="text-muted-foreground">{userData.login}</div>
        </div>
        <div className="break-words">{userData.bio}</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <PersonIcon /> {userData.followers} Seguidores
        </div>
        <div className="flex items-center gap-2">
          <PersonIcon /> {userData.following} Seguindo
        </div>
        {!!userData?.email && (
          <div>
            <EnvelopeClosedIcon /> {userData.email}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
