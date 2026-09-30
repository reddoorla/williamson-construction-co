<script lang="ts">
  import type { Content } from "@prismicio/client";
  import ButtonRow from "$lib/components/ButtonRow.svelte";

  let { slice }: { slice: Content.CtaBlockSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell py-16 lg:pb-24"
>
  <div class="mx-auto max-w-[920px]">
    <h2 class="{slice.primary.size === 'medium' ? 'wc-h2' : 'wc-h1'} text-left text-primary">
      {slice.primary.heading}
    </h2>
    <ButtonRow
      items={slice.items}
      grounds={["white"]}
      restyle={{ "outline-primary": "ghost-primary" }}
      class="mt-8"
    />
  </div>
</section>
