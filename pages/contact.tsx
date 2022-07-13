import Layout from "../components/layout";
import ProfileCard from "../components/ProfileCard";

export default function About() {
  return (
    <Layout home={false}>
      <div className="md:flex md:items-baseline md:gap-6 md:justify-center">
        
        <form className="flex-1 md:max-w-sm mt-6" action="" method="post">

          <p className="font-bold text-xl mb-4">Entre em contato:</p>

          <label className="w-full" htmlFor="first">Primeiro nome:</label>
          <input className="w-full mb-4 rounded bg-transparent border-gray-900 dark:border-gray-100" type="text" name="first" id="first" required aria-required />

          <label className="w-full" htmlFor="last">Sobrenome:</label>
          <input className="w-full mb-4 rounded bg-transparent border-gray-900 dark:border-gray-100" type="text" name="last" id="last" />

          <label className="w-full" htmlFor="email">E-mail:</label>
          <input className="w-full mb-4 rounded bg-transparent border-gray-900 dark:border-gray-100" type="email" name="email" id="email" required aria-required />

          <label className="w-full" htmlFor="phone">Telefone:</label>
          <input className="w-full mb-4 rounded bg-transparent border-gray-900 dark:border-gray-100" type="tel" name="phone" id="phone" />

          <button className="w-full rounded py-4 px-6 mt-4 bg-blue-500 text-white" type="submit">Enviar</button>

        </form>
      </div>
    </Layout>
  )
}