<script lang="ts">
  import Workbench from '#lib/components/Workbench.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<Workbench mac={data.mac} />
