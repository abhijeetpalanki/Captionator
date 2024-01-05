import PageHeaders from "@/components/PageHeaders";

export default function Pricing() {
  return (
    <div>
      <PageHeaders h1Text="Pricing" h2Text="Choose a plan that works for you" />

      <div className="bg-white text-slate-700 text-center rounded-lg max-w-xs mx-auto p-4">
        <h3 className="font-bold text-3xl">Free</h3>
        <h4 className="">Forever</h4>
      </div>
    </div>
  );
}
