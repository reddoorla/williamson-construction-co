<script lang="ts">
  import { SliceZone } from "@prismicio/svelte";
  import { components } from "$lib/slices";
  import type { ActionData, PageData } from "./$types";

  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<SliceZone
  slices={data.page.data.slices}
  {components}
  context={{ intake: { formTs: data.formTs, result: form } }}
/>
