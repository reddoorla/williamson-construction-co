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
  class="mb-16"
>
  <div class="mx-auto max-w-[1280px] max-[992px]:px-[10%] max-[768px]:px-[4%]">
    <h2 class="wc-h3 text-center text-primary">{slice.primary.heading}<br />&zwj;</h2>
    {#if slice.primary.intro}
      <p
        class="pb-8 text-center text-[2.25rem] leading-[1.6em] font-light text-primary max-[992px]:text-[2rem] max-[768px]:text-[1.4rem]"
      >
        {slice.primary.intro}
      </p>
    {/if}
    <ol class="flex justify-between max-[992px]:flex-col max-[992px]:items-center">
      {#each slice.items as item, i (i)}
        {@const href = anchorHref(item.anchor)}
        <li class="my-16 flex w-[16%] max-[992px]:w-[40%]">
          <svelte:element
            this={href ? "a" : "div"}
            {href}
            class="flex w-full flex-col items-center justify-between text-center {href
              ? 'group hover:opacity-100'
              : ''}"
          >
            <span
              class="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary"
              aria-hidden="true"
              ><span class="mb-[5px] inline-block text-[26px] leading-5 font-medium text-white"
                >{i + 1}</span
              ></span
            >
            {#if isFilled.image(item.icon)}
              <span class="block w-full px-[5px]">
                <PrismicImage
                  field={item.icon}
                  alt=""
                  class="w-full {href
                    ? 'transition-opacity duration-[350ms] ease-in group-hover:opacity-55'
                    : ''}"
                />
              </span>
            {/if}
            <span
              class="wc-h3 mt-8 block font-normal text-primary {href
                ? 'transition-opacity duration-[350ms] ease-in group-hover:opacity-(--wc-link-fade)'
                : ''}"
            >
              <span class="sr-only">{`Phase ${i + 1}: `}</span>{item.label}
            </span>
          </svelte:element>
        </li>
      {/each}
    </ol>
    {#if isFilled.richText(slice.primary.outro)}
      <div class="wc-p text-primary [&_p]:mb-[10px]">
        <PrismicRichText field={slice.primary.outro} />
      </div>
    {/if}
  </div>
</section>
