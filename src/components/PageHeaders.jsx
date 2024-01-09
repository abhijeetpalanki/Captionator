export default function PageHeaders({
  h1Text = "header text",
  h2Text = "Subheader text",
}) {
  return (
    <section className="mt-12 mb-4 text-center sm:mb-8 sm:mt-24">
      <h1
        className="text-xl sm:text-3xl"
        style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
      >
        {h1Text}
      </h1>
      <h2 className="text-sm text-white/75 sm:text-base">{h2Text}</h2>
    </section>
  );
}
