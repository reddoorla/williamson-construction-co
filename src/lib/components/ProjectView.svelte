<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled } from "@prismicio/client";
  import TitlePanel from "$lib/components/TitlePanel.svelte";
  import { vimeoEmbedUrl } from "$lib/vimeo-url";
  import type { ProjectDocument } from "../../prismicio-types";

  type Props = { project: ProjectDocument };

  let { project }: Props = $props();

  const gallery = $derived(project.data.gallery.filter((item) => isFilled.image(item.image)));
  const video = $derived(vimeoEmbedUrl(project.data.vimeo_url));
</script>

<article data-project={project.uid}>
  <TitlePanel layout="project">
    {#snippet media()}
      {#if isFilled.image(project.data.hero_image)}
        <PrismicImage
          field={project.data.hero_image}
          alt=""
          class="relative block h-auto w-full scale-110"
          imgixParams={{ w: 2400 }}
          loading="eager"
        />
      {/if}
    {/snippet}
    {#snippet heading(cls: string)}
      <h1 class="wc-h1 {cls}">{project.data.title}</h1>
    {/snippet}
    {#snippet aside()}
      {#if isFilled.richText(project.data.scope)}
        <h2 class="wc-p mt-8 mb-[10px] pt-4 font-semibold">Scope of Work</h2>
        <div class="wc-scope wc-p [&_p]:mb-[10px]">
          <PrismicRichText field={project.data.scope} />
        </div>
      {/if}
    {/snippet}
  </TitlePanel>

  <section class="mx-auto my-16 w-full max-w-[1280px]" aria-label="{project.data.title} gallery">
    {#if video}
      <div class="relative aspect-video w-full">
        <iframe
          src={video}
          title="{project.data.title} video"
          class="absolute inset-0 h-full w-full"
          allow="fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    {/if}
    {#if gallery.length > 0}
      <ul class="mt-[60px]">
        {#each gallery as item, i (i)}
          <li class="pb-16">
            <PrismicImage
              field={item.image}
              fallbackAlt=""
              class="block w-full"
              imgixParams={{ w: 1600 }}
              loading="lazy"
            />
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</article>
