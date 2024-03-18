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
      <CardHeader className="flex flex-row justify-start items-center md:flex-col md:justify-center gap-4">
        <Image
          src={userData.avatar_url}
          width={256}
          height={256}
          alt={userData.name}
          className="rounded-full self-center w-16 md:w-64"
        />
        <div className="flex flex-col gap-0 md:self-start">
          <div className="font-bold">{userData.name}</div>
          <div className="text-muted-foreground">{userData.login}</div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <div className="break-words">{userData.bio}</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <PersonIcon /> {userData.followers} Seguidores
          </div>
          <div className="flex items-center gap-1">
            <PersonIcon /> {userData.following} Seguindo
          </div>
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
