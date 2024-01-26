import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const EmojiSticker = ({ imageSize, stickerSource }) => {

  // Position of sticker
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  /* Gestures */
  // Scale sticker
  const scaleImage = useSharedValue(imageSize);
  // Double tap gesture scales the sticker
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    });

  // Animated style -> scale sticker with spring animation
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  // Pan sticker on drag
  const drag = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  })

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[ containerStyle, { top: -350 } ]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image 
            source={stickerSource}
            style={[ imageStyle, { width: imageSize, height: imageSize } ]}
            resizeMode="contain"
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}

export default EmojiSticker