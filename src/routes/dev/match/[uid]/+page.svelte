<script lang="ts">
  import { SliceZone } from "@prismicio/svelte";
  import ProjectView from "$lib/components/ProjectView.svelte";
  import { components } from "$lib/slices";
  import { INTAKE_PAGE_UID } from "$lib/intake";

  let { data } = $props();
</script>

{#if data.project}
  <ProjectView project={data.project} />
{:else}
  <SliceZone
    slices={data.slices as never}
    {components}
    context={{
      projects: data.projects,
      intake: data.uid === INTAKE_PAGE_UID ? { formTs: data.formTs, result: null } : undefined,
    }}
  />
{/if}
