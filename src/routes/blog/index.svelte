<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
  import IconNewsPaper from "../../components/IconNewsPaper.svelte"
  import IconChatBubbleDots from "../../components/IconChatBubbleDots.svelte"
  import IconLink from "../../components/IconLink.svelte"

	export let posts;

  function articleNb() {
    return posts.filter(p => p.type === "article").length
  }

  function noteNb() {
    return posts.filter(p => p.type === "note").length
  }

  function linkNb() {
    return posts.filter(p => p.type === "link").length
  }

  function formatDate(date) {
    // date is an ISO xxx date with a T separating date and time
    return date.split("T")[0]
  }

</script>

<svelte:head>
	<title>Blog index</title>
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
      <span class="mr-4 text-gray-500">
        {articleNb()} articles
      </span>
      <span class="mr-4 text-gray-500">
        {noteNb()} notes
      </span>
      <span class="mr-4 text-gray-500">
        {linkNb()} liens
      </span>
    </div>
  </div>
</div>

<div class="flex flex-row justify-center px-4 pt-4 pb-10">
  <div class="flex flex-col max-w-screen-lg lg:min-w-screen-lg">
    <h1 class="text-lg text-teal-700 uppercase tracking-wider font-bold mt-6">Derniers contenus</h1>
    <div class="flex flex-col mt-6">
      {#each posts as post}
        <a rel='prefetch' href='blog/{post.slug}'>
          <div class="flex flex-row items-center my-2">
            {#if post.type === "article"}
              <IconNewsPaper/>
            {:else if post.type === "note"}
              <IconChatBubbleDots/>
            {:else if post.type === "link"}
              <IconLink/>
            {/if}
            <span class="ml-2">
              {post.title}
            </span>
            <span class="ml-2 text-gray-500">
              {formatDate(post.date)}
            </span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

