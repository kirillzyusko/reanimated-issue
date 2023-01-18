import React from 'react';
import {Text, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import Reanimated, {
  useAnimatedRef,
  useEvent,
  useHandler,
} from 'react-native-reanimated';

const AnimatedPager = Reanimated.createAnimatedComponent(PagerView);

export function usePagerScrollHandler(handlers, dependencies) {
  const {context, doDependenciesDiffer} = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent(
    event => {
      'worklet';
      const {onPageScroll} = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer,
  );
}

const AnimatedRefExample = () => {
  const animatedRef = useAnimatedRef();

  const handler2 = usePagerScrollHandler({
    onPageScroll: e => {
      'worklet';
      console.log(222, animatedRef.current);
    },
  });

  return (
    <>
      <Reanimated.ScrollView
        style={{flex: 1, backgroundColor: 'red'}}
        ref={animatedRef}
        scrollEventThrottle={16}
      />
      <AnimatedPager style={{flex: 2}} initialPage={0} onPageScroll={handler2}>
        <View key="1">
          <Text>First page</Text>
        </View>
        <View key="2">
          <Text>Second page</Text>
        </View>
        <View key="3">
          <Text>Third page</Text>
        </View>
      </AnimatedPager>
    </>
  );
};

export default AnimatedRefExample;
