<script lang="ts">
  import { PrismicImage } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import ButtonRow from "$lib/components/ButtonRow.svelte";

  let { slice }: { slice: Content.ContactCardSlice } = $props();

  const email = $derived(slice.primary.email?.trim() || null);
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell mb-16"
>
  <div class="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
    <div class="text-center md:w-1/2">
      {#if isFilled.image(slice.primary.photo)}
        <PrismicImage
          field={slice.primary.photo}
          alt=""
          class="mx-auto w-3/5 rounded-full"
          imgixParams={{ w: 600 }}
        />
      {/if}
      <h2 class="wc-h2 mt-4 text-primary">{slice.primary.name}</h2>
      <p class="wc-h3 text-primary">{slice.primary.role}</p>
    </div>
    <div class="md:w-[45%]">
      <div class="bg-primary px-6 py-8 text-white">
        <h3 class="text-left text-[30px] leading-[35px] text-white">{slice.primary.heading}</h3>
        <p class="mt-6 text-base leading-7">{slice.primary.body}</p>
        <ButtonRow items={slice.items} class="mt-6" />
      </div>
      <address class="mt-6 text-base leading-7 text-primary not-italic">
        {#if email}<a href="mailto:{email}" class="text-primary">{email}</a><br />{/if}
        {#if slice.primary.address}{slice.primary.address}<br />{/if}
        {#if slice.primary.license}{slice.primary.license}{/if}
      </address>
    </div>
  </div>
</section>
