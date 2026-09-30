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

  $effect(() => {
    if (result?.success) confirmationEl?.focus();
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
    class="wc-intake mx-auto mt-8 flex max-w-[560px] flex-col gap-4"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
  >
    {#if result?.error}
      <p role="alert" class="border-2 border-red-700 bg-red-50 p-4 text-red-900">{result.error}</p>
    {/if}

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
        <fieldset class="flex flex-wrap items-center gap-x-8 gap-y-2">
          <legend class="float-left mr-4 w-full text-lg font-light text-primary sm:w-1/4">
            {field.label}
          </legend>
          {#each YES_NO as option (option)}
            <label class="flex min-h-6 items-center gap-2 text-primary">
              <input type="radio" name={field.name} value={option} class="h-4 w-4 accent-primary" />
              {option}
            </label>
          {/each}
        </fieldset>
      {:else}
        <Field
          name={field.name}
          label={field.label}
          type={field.kind}
          required={field.required ?? false}
          autocomplete={field.autocomplete}
          placeholder={field.placeholder}
          maxlength={500}
        />
      {/if}
    {/each}

    <TurnstileWidget />

    <button
      type="submit"
      disabled={submitting}
      aria-busy={submitting}
      class="{buttonClass('gold')} self-start disabled:cursor-wait"
    >
      {submitting ? "Sending…" : "Submit"}
    </button>
  </form>
{/if}
