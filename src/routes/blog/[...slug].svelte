<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;

  function formatDate(date) {
    // date is an ISO xxx date with a T separating date and time
    return date.split("T")[0]
  }

</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="flex flex-row justify-center bg-teal-800 py-4">
  <div class="flex flex-row flex-wrap max-w-screen-lg lg:min-w-screen-lg">
    <div class="flex flex-row flex-wrap justify-start ml-2 lg:ml-0">
      <h1 class="font-mono mr-8">
        <a href="/">
          KreaKo
        </a>
      </h1>
      <h1 class="text-white font-bold mr-8">
        {post.title}
      </h1>
    </div>
    <div class="flex flex-row flex-wrap flex-grow justify-end mr-2 lg:mr-0">
      {#if post.tags }
        {#each post.tags as tag}
          <span class="text-gray-500 mr-2">
            #{tag}
          </span>
        {/each}
      {/if}
      <span class="ml-6 text-gray-500">
        {formatDate(post.date)}
      </span>
    </div>
  </div>
</div>

<div class="flex flex-row justify-center px-4 pt-4 pb-10">
  <div class="flex flex-col max-w-screen-lg lg:min-w-screen-lg">
    <div class='markdown'>
      {@html post.html}
    </div>
  </div>
</div>
