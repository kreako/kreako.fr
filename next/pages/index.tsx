import type { NextPage } from "next"
import Head from "next/head"
import ContactBlock from "../components/contact-block"
import ProjectCard from "../components/project-card"
import ProjectHashtag from "../components/project-hashtag"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>home - kreako</title>
        <meta name="description" content="home of kreako.fr" />
      </Head>

      <section className="flex flex-col items-center min-h-[18rem] md:min-h-[24rem] lg:min-h-[32rem]">
        <div className="flex flex-col justify-center flex-grow items-center">
          <h1 className="text-3xl uppercase font-extrabold tracking-widest text-center text-sky-600">
            Full Stack Developer
          </h1>
          <div>
            #{"{"}java,type{"}"}script #react #vue
          </div>
          <div>#rust #python</div>
        </div>
      </section>

      <section>
        <ContactBlock />
      </section>

      <section className="flex flex-col px-2 py-6 mt-12 items-center">
        <div className="uppercase tracking-wider font-bold text-sky-600 text-sm">
          Open-source projects
        </div>
        <div className="grid justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:max-w-screen-md lg:max-w-screen-xl gap-x-4">
          <ProjectCard
            img="/projects/soklaki.png"
            url="https://soklaki.fr"
            name="soklaki"
            github="https://github.com/kreako/soklaki"
          >
            <div>A SaaS for french schools to help them to comply with regulations.</div>
            <div className="mt-4 text-sm">
              <p>
                Frontend with <ProjectHashtag name="vue" /> and{" "}
                <ProjectHashtag name="tailwindcss" />
              </p>
              <p>
                Backend with <ProjectHashtag name="rust" />, <ProjectHashtag name="python" />,{" "}
                <ProjectHashtag name="hasura" /> and <ProjectHashtag name="postgresql" />
              </p>
              <p>
                Infrastructure with <ProjectHashtag name="docker/podman" />,{" "}
                <ProjectHashtag name="ansible" />, <ProjectHashtag name="prometheus" /> and{" "}
                <ProjectHashtag name="grafana" />
              </p>
            </div>
          </ProjectCard>
          <ProjectCard
            img="/projects/tailwind.png"
            url="https://github.com/kreako/inkscape-gimp-tailwindcss-palette"
            name="Tailwindcss palette"
            github="https://github.com/kreako/inkscape-gimp-tailwindcss-palette"
          >
            <div>Tailwindcss palette for inkscape or gimp.</div>
            <div className="mt-4 text-sm">
              <p>
                <ProjectHashtag name="javascript" />
              </p>
            </div>
          </ProjectCard>
          <ProjectCard
            img="/projects/blog.png"
            url="https://kreako.fr/blog"
            name="Blog"
            github="https://github.com/kreako/kreako.fr"
          >
            <div>
              Next.js site with a strapi/postgresql backend. Showcase, ressources and ideas storage.
            </div>
            <div className="mt-4 text-sm">
              <p>
                <ProjectHashtag name="typescript" />, <ProjectHashtag name="next" />,{" "}
                <ProjectHashtag name="strapi" />, <ProjectHashtag name="meilisearch" />,{" "}
                <ProjectHashtag name="docker/podman" />, <ProjectHashtag name="ansible" />,{" "}
                <ProjectHashtag name="jamstack" />
              </p>
            </div>
          </ProjectCard>
          <ProjectCard
            img="/projects/cleomacs.png"
            url="https://github.com/kreako/cleomacs"
            name="Cleomacs"
            github="https://github.com/kreako/cleomacs"
          >
            <div>Saas starter mono-repo typescript template</div>
            <div className="mt-4 text-sm">
              <p>
                Frontend with <ProjectHashtag name="react" />, <ProjectHashtag name="typescript" />{" "}
                and <ProjectHashtag name="tailwindcss" />
              </p>
              <p>
                Backend with <ProjectHashtag name="typescript" />, <ProjectHashtag name="prisma" />,{" "}
                <ProjectHashtag name="express" /> and <ProjectHashtag name="postgresql" />
              </p>
            </div>
          </ProjectCard>
        </div>
      </section>
      <section className="mt-12">
        <ContactBlock />
      </section>
    </>
  )
}

export default Home
