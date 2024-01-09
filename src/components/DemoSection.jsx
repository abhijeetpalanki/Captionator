import SparklesIcon from "./SparklesIcon";

export default function DemoSection() {
  return (
    <section className="flex items-center justify-around mt-8 sm:mt-12">
      <div className="hidden sm:block bg-gray-800/50 w-[240px] h-[480px] rounded-xl"></div>
      <div className="hidden sm:block">
        <SparklesIcon />
      </div>
      <div className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl"></div>
    </section>
  );
}
