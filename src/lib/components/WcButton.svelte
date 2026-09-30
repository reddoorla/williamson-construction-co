<script lang="ts">
  import type { Snippet } from "svelte";
  import { buttonClass, type ButtonVariant } from "$lib/button-styles";

  type Props = {
    href: string;
    variant?: ButtonVariant;
    class?: string;
    download?: boolean;
    children: Snippet;
  };

  let { href, variant = "gold", class: passedClasses = "", download, children }: Props = $props();
</script>

<a {href} class={buttonClass(variant, passedClasses)} download={download || undefined}>
  {@render children()}
</a>
