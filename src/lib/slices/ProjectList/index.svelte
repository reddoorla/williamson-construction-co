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

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell pt-16 pb-16"
>
  {#if slice.primary.heading}
    <h2 class="wc-h3 my-8 pt-8 text-center text-primary">{slice.primary.heading}</h2>
  {/if}
  <ul class="flex flex-col gap-16">
    {#each projects as project (project.id)}
      <li class="relative">
        <a href={projectHref(project.uid)} tabindex="-1" aria-hidden="true" class="block">
          {#if isFilled.image(project.image)}
            <PrismicImage
              field={project.image}
              alt=""
              class="block aspect-[16/9] w-full object-cover"
              imgixParams={{ w: 1600 }}
              loading="lazy"
            />
          {/if}
        </a>
        <div
          class="relative z-10 mx-4 -mt-16 bg-primary/90 p-8 text-white md:mr-8 md:ml-auto md:-mt-64 md:w-1/3"
        >
          <h3 class="wc-h3 mb-8 text-left text-white">{project.title}</h3>
          {#if isFilled.richText(project.scope)}
            <p class="text-base font-bold">Scope of Work</p>
            <div class="wc-scope mt-2 text-base leading-7">
              <PrismicRichText field={project.scope} />
            </div>
          {/if}
          <WcButton href={projectHref(project.uid)} class="mt-8"
            >View Project<span class="sr-only">: {project.title}</span></WcButton
          >
        </div>
      </li>
    {/each}
  </ul>
</section>
