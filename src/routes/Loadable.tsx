import LoadingScreen from "components/LoadingScreen";
import { ElementType, Suspense } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};
