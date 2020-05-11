<script>
  import SprintDiagram from '../components/SprintDiagram.svelte'
</script>

<svelte:head>
	<title>KreaKo freelance</title>
</svelte:head>

<div class="flex flex-row justify-center bg-teal-800 py-4">
  <div class="flex flex-row flex-wrap max-w-screen-lg lg:min-w-screen-lg">
    <div class="flex flex-row flex-wrap justify-start">
      <h1 class="font-mono mr-8">
        <a href="/">
          KreaKo
        </a>
      </h1>
    </div>
    <div class="flex flex-row flex-wrap flex-grow justify-end">
      <span class="mr-4 text-white">
        <a class="font-bold" href="mailto:olivier@kreako.fr">
          olivier@kreako.fr
        </a>
      </span>
      <span class="mr-4 text-white">
        <a href="tel:+33698990069">
          +33 (0)6 98 99 00 69
        </a>
      </span>
    </div>
  </div>
</div>

<div class="flex flex-row justify-center mt-6 lg:mt-12">
  <div class="flex flex-row justify-start">
    <div class="flex flex-col max-w-screen-lg lg:min-w-screen-lg">
      <div class="text-teal-700 text-xl font-bold uppercase tracking-wider">
        Augmentons votre valeur
      </div>
      <p class="mt-6 my-2">
        En développant un service ou un produit, il n'est pas rare de vouloir faire quelque
        chose de très complet qui propose beaucoup de fonctionnalités.
      </p>
      <p class="my-2">
        Pourtant, ce n'est pas toujours une bonne idée.
      </p>
      <p class="my-2">
        En termes de coûts, beaucoup de fonctionnalités, c'est synonyme d'un coût de développement élevé,
        d'un coût de maintenance élevé et souvent d'un coût d'opérations élevé.
        Quant à la satisfaction de l'utilisateur, beaucoup de fonctionnalités,
        c'est potentiellement plus de problèmes.
        Et c'est encore un coût plus élevé en support utilisateur.
      </p>
      <p class="my-2">
        Pourtant seule une petite partie de ces fonctionnalités vous apporte vraiment de la valeur.
        Comme le prévoit <a href="https://fr.wikipedia.org/wiki/Principe_de_Pareto">le principe de Pareto</a>,
        20% des fonctionnalités vont vous apporter 80% de valeur.
      </p>
      <p class="my-2">
        C'est totalement contre-intuitif, néanmoins, il est bien plus intéressant pour vous de faire
        <span class="font-bold">
          un produit incomplet et bon
        </span>
        qu'un produit complet et moyen.
      </p>
      <p class="italic my-6 border-l-8 pl-4 border-teal-600">
        J'accompagne mes clients à mettre de côté ce qui ne leur apporte pas de valeur.
      </p>
      <p class="mt-6 my-2 text-gray-600">
        La même philosophie s'applique pour mes services d'administration et de formation.
        Voici quelques exemples :
      </p>
      <p class="my-2 text-gray-600">
        Est-ce qu'une newsletter est vraiment le moyen le mieux adapté pour toucher vos clients ?
        Peut-être que vos taux d'ouvertures sont bas ? Les taux de clics encore plus bas ?
        Est-ce que le coût d'envoyer une newsletter est justifié ?
      </p>
      <p class="my-2 text-gray-600">
        Est-ce que ces fonctionnalités puissantes, mais complexes, vont être utilisées par vos
        clients ? Est-ce que c'est justifié d'encombrer l'interface de la majorité pour une minorité ?
        Est-ce qu'on peut imaginer un moyen moins coûteux de les offrir ? (une API par exemple ?)
      </p>
      <p class="my-2 text-gray-600">
        Est-ce que vous voulez vraiment augmenter vos capacités de stockage actuelles ?
        Peut-être qu'une partie de vos données n'est utilisée que très rarement ?
        Est-ce qu'elles pourraient être stockées, à moindre coût, à l'aide d'une technologie
        différente ? (à bandes par exemple ?)
      </p>
      <div class="text-teal-700 text-xl mt-6 lg:mt-12 font-bold uppercase tracking-wider">
        Agilité - Méthodes
      </div>
      <p class="mt-6 my-2">
        Je m'adapte à votre contexte, néanmoins je vous propose de travailler en accord avec
        <a href="https://fr.wikipedia.org/wiki/Manifeste_agile">
          les méthodes agiles.
        </a>
        C'est-à-dire que je mets en avant le travail en cycles courts, en "<span class="italic">sprint</span>",
        de 2 semaines ou moins, pendant lequel le temps s'organise de la manière suivante :
      </p>
      <p class="my-2">
        Avant le début du sprint, on prend un temps pour établir ensemble une liste de fonctionnalités/tâches.
        Puis vous classez cette liste par ordre de priorité.
        Ce classement est l'occasion de vous aider à prioritiser ce qui est essentiel,
        ce qui apporte de la valeur, par rapport à ce qui est peut-être plus secondaire.
      </p>
      <p class="my-2">
        Puis le sprint démarre et pendant ce sprint, je travaille sur les fonctionnalités du sommet de la liste.
      </p>
      <p class="my-2">
        À la fin du sprint, je vous les livre, fonctionnelles, testées, validées et documentées.
        Puis vous décidez de la tenue d'un sprint supplémentaire pour continuer à développer les fonctionnalités
        qui suivent dans la liste ou vous décidez que les fonctionnalités suivantes n'en valent pas la peine et
        vous êtes libre d'arrêter.
      </p>
      <p class="my-2">
        De cette façon, vous obtenez le <abbr title="Retour sur investissement">ROI</abbr> maximum :
        <span class="font-bold">
          les fonctionnalités les plus génératrices de valeur au coût minimum.
        </span>
      </p>
      <div class="flex justify-center my-10">
        <div class="w-5/5 lg:w-3/5 flex flex-col items-center">
            <SprintDiagram/>
          <p class="text-gray-600 mt-6">
            Principe d'enchaînement des sprints et des livraisons
          </p>
        </div>
      </div>
      <p class="mt-4 my-2">
        C'est à la fin du sprint, juste avant que le prochain démarre que vous avez la possibilité
        de modifier la liste.
        Au fur et à mesure de l'avancement du projet et de l'enchaînement des sprints, vous aurez toute
        latitude pour ajouter des fonctionnalités ou en supprimer et re-prioritiser, en fonction de l'évolution
        de vos activités.
      </p>
      <p class="my-2">
        Les méthodes agiles permettent de produire des logiciels et des services de qualité qui
        correspondent à vos besoins, puisque vous utilisez le logiciel avant que le développement
        soit fini.
        Ces livraisons régulières et fréquentes vous permettent de surveiller l'évolution du produit
        au plus près et de faire modifier ce qui vous semble nécessaire de modifier.
      </p>
      <p class="italic my-6 border-l-8 pl-4 border-teal-600">
        L'agilité vous permet d'obtenir de la valeur, de la souplesse, de la réactivité
        et la qualité dont vous avez besoin.
      </p>
      <p class="mt-6 my-2">
        Dans certains cas bien précis, je travaille au forfait. C'est-à-dire que je m'engage à réaliser
        une activité bien définie pour une somme d'argent convenue à l'avance.
      </p>
      <p class="my-2">
        Je le fais lorsque l'activité est vraiment bien définie et qu'il n'y a pas de marges sur
        l'interprétation du résultat. C'est donc souvent des activités courtes et ponctuelles.
        Par exemple : une migration d'un serveur vers une version plus récente ou la conversion
        de données d'un format A vers un format B.
        Pour ce type de relation commerciale, je privilégie les clients que je connais déjà ou 
        que l'on me recommande.
      </p>
      <div class="text-teal-700 text-xl mt-6 lg:mt-12 font-bold uppercase tracking-wider">
        Des détails techniques
      </div>
      <p class="mt-6">
        Pour les projets de développement web, j'utilise fréquemment :
      </p>
      <ul>
        <li>
          <span class="text-teal-500">#javascript</span> : vanilla, vuejs, svelte/sapper, jquery
        </li>
        <li>
          <span class="text-teal-500">#css</span> : vanilla, tailwind, bootstrap
        </li>
        <li>
          <span class="text-teal-500">#python</span> : flask, django
        </li>
        <li>
          <span class="text-teal-500">#rust</span> : actix
        </li>
      </ul>
      <p class="mt-6 my-2">
        Pour les projets de développement plutôt orienté système, j'utilise fréquemment :
      </p>
      <ul>
        <li>
          <span class="text-teal-500">#python</span> : scripts, surveillance, statistiques, intégration/glue
        </li>
        <li>
          <span class="text-teal-500">#rust</span> : serveur, extensions python/tcl, calcul
        </li>
        <li>
          <span class="text-teal-500">#c</span> : émulateur, compilateurs, drivers linux
        </li>
      </ul>
      <p class="mt-6 my-2">
        Je développe de nouveaux projets (depuis l'idée jusqu'à la production) ou
        je fais la maintenance de vos anciens projets (migration, correction de bugs, évolutions...).
        Je peux le faire seul de mon côté (avec l'implication du client, bien sûr !) ou avec une équipe pré-existante.
      </p>
      <p class="mt-6 my-2">
        Pour l'administration, j'utilise fréquemment :
      </p>
      <ul>
        <li>
          <span class="text-teal-500">#linux</span> : debian/ubuntu, redhat/fedora, nixos
        </li>
        <li>
          <span class="text-teal-500">#ansible</span> : automatisation, déploiement reproductible
        </li>
        <li>
          <span class="text-teal-500">serveur web</span> : nginx, apache
        </li>
        <li>
          <span class="text-teal-500">Base de données</span> : postgresql, redis
        </li>
        <li>
          <span class="text-teal-500">conteneurs</span> : #docker, #lxc
        </li>
        <li>
          <span class="text-teal-500">#python</span> : scripts et automatisations diverses
        </li>
      </ul>
      <p class="mt-6 my-2">
        J'administre des moyens pour assurer le maintien en condition opérationnelle et la continuité de service.
        J'installe des serveurs sous linux (pour le web ou la production industrielle par exemple) et
        je les configure pour qu'ils répondent à vos besoins.
        Je peux aussi être présent en cas d'urgence (incident de production, crash matériel,
        restauration de sauvegardes...).
      </p>
      <div class="text-teal-700 text-xl mt-6 lg:mt-12 font-bold uppercase tracking-wider">
        Télétravail
      </div>
      <p class="mt-6 my-2">
        Je travaille pour vous à distance.
        C'est bon pour la planète : moins de déplacements et
        c'est bon pour votre entreprise : moins de coûts
        (déplacements, matériels, espaces...).
      </p>
      <p class="my-2">
        Je me déplace pour les situations le requérant vraiment,
        comme des installations sur des réseaux non-accessibles
        ou des formations en présentiels.
      </p>
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
