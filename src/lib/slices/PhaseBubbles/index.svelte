<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";

  let { slice }: { slice: Content.PhaseBubblesSlice } = $props();

  const anchorHref = (anchor: string | null) => (anchor ? `#${anchor.replace(/^#/, "")}` : null);
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  id={slice.primary.section_id || undefined}
  class="wc-shell pb-16"
>
  <h2 class="wc-h3 text-center text-primary">{slice.primary.heading}</h2>
  {#if slice.primary.intro}
    <p
      class="mx-auto mt-4 max-w-[920px] text-center text-[30px] leading-[1.6em] font-light text-primary max-md:text-[22px]"
    >
      {slice.primary.intro}
    </p>
  {/if}
  <ol
    class="my-16 flex flex-col items-center gap-16 md:flex-row md:items-start md:justify-between md:gap-4"
  >
    {#each slice.items as item, i (i)}
      {@const href = anchorHref(item.anchor)}
      <li class="w-1/2 md:w-[16%]">
        <svelte:element
          this={href ? "a" : "div"}
          {href}
          class="flex flex-col items-center text-center"
        >
          <span
            class="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[26px] text-white"
            aria-hidden="true">{i + 1}</span
          >
          {#if isFilled.image(item.icon)}
            <PrismicImage field={item.icon} alt="" class="w-full" />
          {/if}
          <span class="mt-8 block text-[30px] leading-[35px] text-primary max-md:text-[25px]">
            <span class="sr-only">{`Phase ${i + 1}: `}</span>{item.label}
          </span>
        </svelte:element>
      </li>
    {/each}
  </ol>
  {#if isFilled.richText(slice.primary.outro)}
    <div class="text-base leading-7 text-primary">
      <PrismicRichText field={slice.primary.outro} />
    </div>
  {/if}
</section>
