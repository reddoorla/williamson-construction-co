<script lang="ts">
  import { PrismicImage, PrismicRichText } from "@prismicio/svelte";
  import { isFilled, type Content } from "@prismicio/client";
  import WcButton from "$lib/components/WcButton.svelte";
  import { pickProjects, projectHref, type ProjectContext } from "$lib/projects";

  let { slice, context }: { slice: Content.ProjectListSlice; context?: ProjectContext } = $props();

  const projects = $derived(
    pickProjects(slice.items, context?.projects ?? [], { fallbackToAll: true }),
  );
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="pt-16">
  <div class="mx-auto max-w-[1280px] max-[991px]:px-[10%] max-[767px]:px-[4%]">
    {#if slice.primary.heading}
      <h2 class="wc-h2 my-8 pt-8 text-center text-primary">{slice.primary.heading}</h2>
    {/if}
    <ul class="my-8">
      {#each projects as project (project.id)}
        <li class="relative mb-8 w-full max-[991px]:mb-16">
          <div class="relative aspect-video overflow-hidden">
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <a
                href={projectHref(project.uid)}
                tabindex="-1"
                aria-hidden="true"
                class="inline-block w-full px-[5px]"
              >
                {#if isFilled.image(project.image)}
                  <PrismicImage
                    field={project.image}
                    alt=""
                    class="block w-full"
                    imgixParams={{ w: 1600 }}
                    loading="lazy"
                  />
                {/if}
              </a>
            </div>
          </div>
          <div
            class="wc-caption relative z-3 -mt-64 mr-8 ml-auto w-[33%] bg-[#004a80e6] p-8 text-white max-[991px]:-mt-16 max-[991px]:ml-8 max-[991px]:w-auto"
          >
            <h3 class="wc-h2 mb-8 text-left text-white">{project.title}</h3>
            {#if isFilled.richText(project.scope)}
              <p class="wc-p mb-2 font-bold">Scope of Work</p>
              <div class="wc-scope wc-p mb-16 flow-root [&_p]:mb-[10px]">
                <PrismicRichText field={project.scope} />
              </div>
            {/if}
            <WcButton href={projectHref(project.uid)}
              >View Project<span class="sr-only">: {project.title}</span></WcButton
            >
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  @media (width: 992px) {
    .wc-caption {
      margin-left: 2rem;
    }
  }
  @media (min-width: 993px) {
    li:nth-child(even) > .wc-caption {
      margin-left: 2rem;
      margin-right: auto;
    }
  }
</style>
