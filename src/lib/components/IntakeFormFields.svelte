<script lang="ts">
  import { enhance } from "$app/forms";
  import Field from "$lib/components/Field.svelte";
  import TurnstileWidget from "$lib/components/TurnstileWidget.svelte";
  import { buttonClass } from "$lib/button-styles";
  import { INTAKE_FIELDS, YES_NO } from "$lib/intake";

  type Result = { success?: boolean; error?: string } | null | undefined;
  type Props = { formTs: number; result: Result; successMessage?: string | null };

  let { formTs, result, successMessage }: Props = $props();

  let submitting = $state(false);
  let confirmationEl = $state<HTMLElement | null>(null);
  let errorEl = $state<HTMLElement | null>(null);

  $effect(() => {
    if (result?.success) confirmationEl?.focus();
  });

  $effect(() => {
    if (result?.error) errorEl?.focus();
  });
</script>

{#if result?.success}
  <p
    bind:this={confirmationEl}
    role="status"
    tabindex="-1"
    class="mx-auto mt-8 max-w-[560px] bg-light p-6 text-center text-primary"
  >
    {successMessage || "Thank you! Your submission has been received!"}
  </p>
{:else}
  <form
    method="POST"
    class="wc-intake mx-auto mb-[15px] flex w-[30rem] flex-col max-[768px]:w-full"
    use:enhance={({ cancel }) => {
      if (submitting) {
        cancel();
        return;
      }
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
  >
    {#if result?.error}
      {#key result}
        <p
          bind:this={errorEl}
          role="alert"
          tabindex="-1"
          class="border-2 border-red-700 bg-red-50 p-4 text-red-900"
        >
          {result.error}
        </p>
      {/key}
    {/if}

    <p class="text-sm text-primary">
      <span aria-hidden="true" class="text-red-600">*</span> marks a required field.
    </p>

    <input type="hidden" name="ts" value={formTs} />
    <input
      type="text"
      name="bot-field"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      class="hidden"
    />

    {#each INTAKE_FIELDS as field (field.name)}
      {#if field.kind === "yes-no"}
        <fieldset class="mb-4 flex w-full items-center justify-between">
          <legend
            class="float-left text-[18px] leading-10 font-light text-primary max-[768px]:text-[14px]"
          >
            {field.label}
          </legend>
          <span class="-mb-[17px] flex w-3/4 justify-start">
            {#each YES_NO as option (option)}
              <label
                class="mb-4 flex w-24 items-center text-[18px] leading-10 font-light text-primary max-[768px]:text-[14px]"
              >
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  class="mr-[10px] h-4 w-4 accent-primary"
                />
                {option}
              </label>
            {/each}
          </span>
        </fieldset>
      {:else}
        <Field
          name={field.name}
          label={field.label}
          type={field.kind}
          required={field.required ?? false}
          autocomplete={field.autocomplete}
          description={field.description}
          maxlength={500}
          inline
        />
      {/if}
    {/each}

    <TurnstileWidget />

    <button
      type="submit"
      aria-disabled={submitting ? "true" : undefined}
      aria-busy={submitting}
      class="{buttonClass('gold', '', [
        'white',
      ])} self-start aria-disabled:cursor-wait aria-disabled:hover:bg-gold aria-disabled:hover:opacity-100"
    >
      {submitting ? "Sending…" : "Submit"}
    </button>
  </form>
{/if}
