'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const createFormSchema = z.object({
  username: z.string().min(2, {
    message: 'O nome do usuário deve ter ao menos 2 caracteres.',
  }),
})

type FormSchema = z.infer<typeof createFormSchema>

type Props = {
  defaultUsername?: string
}

export function FormBite({ defaultUsername }: Props) {
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      username: defaultUsername,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  function onSubmit(data: FormSchema) {
    router.push(`/${data.username}`)
  }

  const hasError = !!errors?.username?.message

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center gap-4 w-full"
      >
        <Input
          className="py-5 !ring-transparent"
          placeholder="Digite nome de usuário do github"
          {...register('username')}
        />
        <Button type="submit" className="py-5" variant="default">
          Bite!
        </Button>
      </form>
      {hasError && (
        <span className="text-sm text-destructive ml-1">
          {errors.username?.message}
        </span>
      )}
    </div>
  )
}
