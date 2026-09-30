<script lang="ts">
  import type { Content } from "@prismicio/client";
  import IntakeFormFields from "$lib/components/IntakeFormFields.svelte";
  import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "$lib/contact";

  type IntakeContext = {
    intake?: { formTs: number; result: { success?: boolean; error?: string } | null | undefined };
  };

  let { slice, context }: { slice: Content.IntakeFormSlice; context?: IntakeContext } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell py-16"
>
  <h2 class="wc-h3 mx-auto max-w-[560px] text-center text-primary">{slice.primary.heading}</h2>
  {#if context?.intake}
    <IntakeFormFields
      formTs={context.intake.formTs}
      result={context.intake.result}
      successMessage={slice.primary.success_message}
    />
  {/if}
  <p class="mt-8 text-center text-base text-primary">
    {context?.intake ? "Or email us at" : "Email us at"}
    <a href={CONTACT_EMAIL_HREF} class="text-primary underline">{CONTACT_EMAIL}</a>.
  </p>
</section>
