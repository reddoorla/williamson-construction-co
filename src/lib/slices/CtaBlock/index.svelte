<script lang="ts">
  import type { Content } from "@prismicio/client";
  import ButtonRow from "$lib/components/ButtonRow.svelte";

  let { slice }: { slice: Content.CtaBlockSlice } = $props();
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="mb-24">
  <div class="mx-auto max-w-[920px] max-[991px]:px-[10%] max-[767px]:px-[4%]">
    <h2
      class="{slice.primary.size === 'medium'
        ? 'wc-h2'
        : 'wc-h1 max-[767px]:text-[45px] max-[767px]:leading-[55px]'} mb-[10px] text-left text-primary"
    >
      {slice.primary.heading}
    </h2>
    <ButtonRow
      items={slice.items}
      grounds={["white"]}
      restyle={{ "outline-primary": "ghost-primary" }}
      gap="gap-x-8 gap-y-8"
      class="mt-6 pt-6 max-[479px]:flex-col max-[479px]:items-center"
    />
  </div>
</section>
