<script lang="ts">
  import type { Content } from "@prismicio/client";
  import ButtonRow from "$lib/components/ButtonRow.svelte";

  let { slice }: { slice: Content.CtaBlockSlice } = $props();
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="mb-24">
  {#if slice.primary.size === "medium"}
    <div class="mx-auto max-w-[1280px] pl-8 max-[992px]:px-[10%] max-[768px]:px-[4%]">
      <h2
        class="wc-h2 ml-8 pr-[25%] text-left text-primary max-[992px]:ml-0 max-[992px]:pr-0 max-[768px]:text-[45px] max-[768px]:leading-[55px]"
      >
        {slice.primary.heading}
      </h2>
      <ButtonRow
        items={slice.items}
        grounds={["white"]}
        restyle={{ "outline-primary": "ghost-primary" }}
        gap="gap-x-8 gap-y-8"
        class="mt-6 ml-8 pt-6 max-[992px]:ml-0 max-[480px]:flex-col max-[480px]:items-start"
      />
    </div>
  {:else}
    <div class="mx-auto max-w-[920px] max-[992px]:px-[10%] max-[768px]:px-[4%]">
      <h2
        class="wc-h1 mb-[10px] text-left text-primary max-[768px]:text-[45px] max-[768px]:leading-[55px]"
      >
        {slice.primary.heading}
      </h2>
      <ButtonRow
        items={slice.items}
        grounds={["white"]}
        restyle={{ "outline-primary": "ghost-primary" }}
        gap="gap-x-8 gap-y-8"
        class="mt-6 pt-6 max-[480px]:flex-col max-[480px]:items-center"
      />
    </div>
  {/if}
</section>
