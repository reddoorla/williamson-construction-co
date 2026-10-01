<script lang="ts">
  import type { Content } from "@prismicio/client";
  import IntakeFormFields from "$lib/components/IntakeFormFields.svelte";
  import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "$lib/contact";

  type IntakeContext = {
    intake?: { formTs: number; result: { success?: boolean; error?: string } | null | undefined };
  };

  let { slice, context }: { slice: Content.IntakeFormSlice; context?: IntakeContext } = $props();
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="pb-16">
  <h2
    class="mx-auto w-[40%] pb-8 text-center text-[35px] leading-[45px] font-medium text-primary max-[991px]:w-[80%] max-[991px]:px-[10%] max-[767px]:w-full max-[767px]:px-[4%]"
  >
    {slice.primary.heading}
  </h2>
  <div class="mx-auto max-w-[1280px] max-[991px]:px-[10%] max-[767px]:px-[4%]">
    {#if context?.intake}
      <IntakeFormFields
        formTs={context.intake.formTs}
        result={context.intake.result}
        successMessage={slice.primary.success_message}
      />
    {/if}
    <p class="mt-8 text-center text-base text-primary">
      {context?.intake ? "Questions? Email us at" : "Email us at"}
      <a href={CONTACT_EMAIL_HREF} class="text-primary underline">{CONTACT_EMAIL}</a>.
    </p>
  </div>
</section>
