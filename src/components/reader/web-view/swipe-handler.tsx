import { I18nManager } from "react-native";
import { Directions, FlingGestureHandler, FlingGestureHandlerEventPayload, GestureHandlerRootView, HandlerStateChangeEventPayload, State } from "react-native-gesture-handler";

interface SwipeHandlerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

type SwipeNativeEvent = Readonly<HandlerStateChangeEventPayload & FlingGestureHandlerEventPayload>;
type SwipeDirection = "left" | "right";

export default function SwipeHandler({ onSwipeLeft, onSwipeRight, children }: SwipeHandlerProps) {
  const onHandlerStateChange = ({ nativeEvent, dir }: { nativeEvent: SwipeNativeEvent, dir: SwipeDirection }) => {
    if (nativeEvent.state === State.ACTIVE) {
      if (dir === "left") {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  };

  return (
    <GestureHandlerRootView>
      <FlingGestureHandler
        direction={I18nManager.isRTL ? Directions.LEFT : Directions.RIGHT}
        onHandlerStateChange={(e) => onHandlerStateChange({ nativeEvent: e.nativeEvent, dir: "right" })}
      >
        <FlingGestureHandler
          direction={I18nManager.isRTL ? Directions.RIGHT : Directions.LEFT}
          onHandlerStateChange={(e) => onHandlerStateChange({ nativeEvent: e.nativeEvent, dir: "left" })}
        >
          {children}
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
  );
}
