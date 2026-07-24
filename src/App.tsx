import { BundleProvider } from "./state/BundleProvider";
import { useBundle } from "./state/useBundle";
import { AccordionStep } from "./components/AccordionStep";
import { ProductCard } from "./components/ProductCard";
import catalog from "./data/bundle.json";
import { ReviewPanel } from "./components/ReviewPanel";

function NextStepButton({ stepId, title }: { stepId: string; title: string }) {
  const { dispatch } = useBundle();
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_STEP", payload: { stepId } })}
        className="mt-4 font-semibold w-[266px] py-1 rounded-lg border border-[#4E2FD2] text-[#4E2FD2] text-lg"
      >
        Next: {title}
      </button>
    </div>
  );
}

function App() {
  return (
    <BundleProvider seedSelections={catalog.seedSelections}>
      <div className="max-w-[1260px] mx-auto flex flex-col md:p-6 md:gap-5 md:flex-row md:items-start xl:flex-col xl:items-stretch xl:gap-4">
        <h1 className="text-2xl font-bold text-center my-5 md:hidden">
          Let's get started!
        </h1>
        <div className="flex-1 min-w-0 flex flex-col md:gap-4 md:grow-0 md:basis-[768px] md:max-w-[768px] xl:grow xl:basis-auto xl:max-w-none">
          {catalog.steps.map((step, i) => {
            const stepProducts = Object.entries(catalog.products).filter(
              ([, p]) => p.stepId === step.id,
            );
            const nextStep = catalog.steps[i + 1];

            return (
              <AccordionStep
                key={step.id}
                stepId={step.id}
                stepNumber={i + 1}
                totalSteps={catalog.steps.length}
                title={step.title}
                icon={step.icon}
              >
                <div className="flex flex-wrap justify-center items-stretch gap-[15px] xl:flex-nowrap xl:justify-start xl:overflow-x-auto">
                  {stepProducts.map(([productId, product]) => (
                    <div
                      key={productId}
                      className="w-full sm:w-[calc(50%-7.5px)] xl:w-56 xl:shrink-0"
                    >
                      <ProductCard productId={productId} product={product} />
                    </div>
                  ))}
                </div>
                {nextStep && (
                  <NextStepButton stepId={nextStep.id} title={nextStep.title} />
                )}
              </AccordionStep>
            );
          })}
        </div>
        <ReviewPanel />
      </div>
    </BundleProvider>
  );
}

export default App;
