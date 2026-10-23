<script lang="ts">
  import { page } from '$app/state';
</script>

<!-- Unknown paths, such as links to the old site, get VS Code's message for a missing file. -->
<main class="watermark">
  {#if page.status === 404}
    <p>The editor could not be opened because the file was not found.</p>
  {:else}
    <p>{page.error?.message}</p>
  {/if}
  <p><a href="/">Open README.md</a></p>
</main>
