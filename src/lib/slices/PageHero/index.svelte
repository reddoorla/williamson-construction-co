<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import BgVideo from "$lib/components/BgVideo.svelte";
  import ButtonRow from "$lib/components/ButtonRow.svelte";
  import TitlePanel from "$lib/components/TitlePanel.svelte";
  import { mediaUrl } from "$lib/links";

  let { slice }: { slice: Content.PageHeroSlice } = $props();

  const mp4 = $derived(mediaUrl(slice.primary.video_mp4));
  const webm = $derived(mediaUrl(slice.primary.video_webm));
  const hasVideo = $derived(Boolean(mp4 || webm));
  const hasAside = $derived(isFilled.richText(slice.primary.body) || slice.items.length > 0);
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  <TitlePanel align={slice.primary.heading_align === "center" ? "center" : "left"}>
    {#snippet media()}
      {#if hasVideo}
        <BgVideo
          {mp4}
          {webm}
          poster={slice.primary.background_image?.url}
          class="absolute inset-0 h-full w-full"
          controlClass="top-20 right-4"
        />
      {:else if isFilled.image(slice.primary.background_image)}
        <PrismicImage
          field={slice.primary.background_image}
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
          imgixParams={{ w: 2400 }}
          loading="eager"
        />
      {/if}
    {/snippet}
    {#snippet heading()}
      <h1 class="wc-h1">{slice.primary.heading}</h1>
    {/snippet}
    {#snippet aside()}
      {#if hasAside}
        {#if isFilled.richText(slice.primary.body)}
          <div class="wc-p mt-2"><PrismicRichText field={slice.primary.body} /></div>
        {/if}
        <ButtonRow
          items={slice.items}
          grounds={["band-over-white", "band-over-black"]}
          class="mt-6"
        />
      {/if}
    {/snippet}
  </TitlePanel>
</section>
