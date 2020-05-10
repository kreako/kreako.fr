<script>
  import IconVision from '../components/IconVision.svelte'
  import IconTask from '../components/IconTask.svelte'
  import IconTeam from '../components/IconTeam.svelte'
  import IconFormation from '../components/IconFormation.svelte'

  export let title
  export let icon
</script>

<div class="flex">
  {#if icon === "IconVision"}
    <IconVision/>
  {:else if icon === "IconTask"}
    <IconTask/>
  {:else if icon === "IconTeam"}
    <IconTeam/>
  {:else if icon === "IconFormation"}
    <IconFormation/>
  {:else}
    <div></div>
  {/if}
  <div class="ml-4 mt-3">
    <div class="font-bold uppercase tracking-wider">
      { title }
    </div>
    <div>
      <slot>
      </slot>
      <p>
        <a class="text-teal-500" href="freelance/">
          En savoir plus...
        </a>
      </p>
    </div>
  </div>
</div>
