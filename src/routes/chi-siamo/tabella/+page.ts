import type { Candidato } from "$lib/utils/utils";
import type { PageLoad } from "./$types";

export const load = (async () => {
  const candidatiFiles = import.meta.glob("../../../md/candidati/*.md");
  const iterableCandidati = Object.entries(candidatiFiles);

  let people = await Promise.all(
    iterableCandidati.map(async ([_, resolver]) => {
      const candidato = <Candidato>(<any>await resolver()).metadata;
      return candidato;
    })
  );

  people = people.sort((a, b) => (a.order > b.order ? 1 : a.order < b.order ? -1 : 0));

  return {
    people,
  };
}) satisfies PageLoad;
