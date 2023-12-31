
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export const AnimationComponent = () => {
  const { RiveComponent } = useRive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    src: "dog.riv",
    // Be sure to specify the correct state machine (or animation) name
    stateMachines: "State Machine 1",
    // This is optional.Provides additional layout control.
    layout: new Layout({
      fit: Fit.FitHeight, // Change to: rive.Fit.Contain, or Cover
      alignment: Alignment.BottomCenter
    }),
    autoplay: true
  });

  return <RiveComponent />;
};