<script>
  import Card from '../components/Card.svelte'

  import IconVision from '../components/IconVision.svelte'
  import IconLaptop from '../components/IconLaptop.svelte'
  import IconTask from '../components/IconTask.svelte'
  import IconTeam from '../components/IconTeam.svelte'
  import IconFormation from '../components/IconFormation.svelte'
</script>

<svelte:head>
	<title>KreaKo</title>
</svelte:head>

<div class="flex flex-row justify-center px-4 pt-4 pb-10 xl:min-h-screen-85">
  <div class="flex flex-col max-w-screen-lg lg:min-w-screen-lg">
    <div class="flex flex-row">
      <div class="flex flex-row justify-start ml-1 xl:ml-0">
        <h1 class="font-bold font-mono">
          <a href="/">
            KreaKo
          </a>
        </h1>
      </div>
      <div class="flex flex-row justify-end flex-grow mr-1 xl:mr-0">
        <a href="/blog">
          blog
        </a>
      </div>
    </div>

    <div class="bg-white p-4 rounded mt-6 lg:mt-8">
      <div class="text-teal-700 text-center font-bold mb-2 uppercase tracking-widest text-3xl">
        Informaticien freelance
      </div>
    </div>

    <div class="mt-2 grid grid-cols-1 gap-4 mt-2 md:grid-cols-2 md:gap-16 md:mt-12">
      <Card title="Vision" icon="IconVision">
        <p>
          Je vous accompagne dans la réalisation de votre vision.
        </p>
        <p>
          Un site web ? Un service ? Un produit ?
        </p>
        <p>
          Nous le définissons ensemble et je prends en charge la conception.
        </p>
      </Card>
      <Card title="Tâches quotidiennes" icon="IconTask">
        <p>
          Je prends en charge la réalisation de vos tâches quotidiennes.
        </p>
        <p>
          Des mises à jour ? Des bugs ? De la maintenance ?
        </p>
        <p>
          Parlons-en, je m'adapte à votre environnement et j'effectue vos tâches d'administration et de maintenance.
        </p>
      </Card>
      <Card title="Renforcement d'équipes" icon="IconTeam">
        <p>
          Je viens renforcer votre équipe, ponctuellement ou régulièrement.
        </p>
        <p>
          Une charge soudaine ? Une tâche de fond ?
        </p>
        <p>
          Présentez-moi votre équipe, je m'ajuste à votre contexte pour renforcer vos capacités.
        </p>
      </Card>
      <Card title="Formation" icon="IconFormation">
        <p>
          Je donne des formations essentiellement sur des sujets techniques.
        </p>
        <p>
          Par exemple, programmation (#c, #tcl, #javascript, #python, #rust),
          administration (#linux, #ansible).
        </p>
        <p>
          Déterminons ensemble vos besoins de formations.
        </p>
      </Card>
    </div>

  </div>
</div>

<div class="flex flex-row justify-center bg-teal-800 py-8">
  <div class="flex flex-row justify-start">
    <div class="flex flex-col max-w-screen-lg">
      <div class="text-white">
        <div>
          <a class="font-bold" href="mailto:olivier@kreako.fr">
            olivier@kreako.fr
          </a>
          /
          <a href="tel:+33698990069">
            +33 (0)6 98 99 00 69
          </a>
        </div>
        <div>
          Siret : xxxxx
          /
          CAPE : xxxx
        </div>
      </div>
    </div>
  </div>
</div>
