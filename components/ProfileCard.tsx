import Link from "next/link";
import { Envelope, GithubLogo, LinkedinLogo } from "phosphor-react";

export default function ProfileCard() {

  return (
    <aside className='md:flex-1'>
      <div className='
            border
            border-gray-900
            dark:border-white
            rounded
            p-4
            overflow-hidden
            items-center
            '
      >
        <h3 className='text-xl font-bold'>Rômulo Takaoka</h3>
        <p className='mt-4'>Sou um apaixonado por tecnologia que teve medo de programação por muito tempo. Desde 2021 decidi superar esse medo e programar minhas aplicações pra valer.</p>

        <div className='flex gap-4 mt-4'>

          <Link
            className='hover:text-blue-500 flex-col'
            href="https://github.com/rtakaoka"
            target={'_blank'}
            aria-label='Perfil Github'
          >
            <GithubLogo size={24} />
          </Link>

          <Link
            className='hover:text-blue-500 flex-col'
            href="https://linkedin.com/in/romulotakaoka"
            aria-label='Perfil LinkedIn'
            target={'_blank'}>
            <LinkedinLogo size={24} />
          </Link>

          <Link
            className='hover:text-blue-500 flex-col'
            href="mailto:romulo.takaoka@desperta.me"
            aria-label='Enviar e-mail'>
            <Envelope size={24} />
          </Link>
        </div>
      </div>
    </aside >
  )
}