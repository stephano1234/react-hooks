import { useEffect, useRef, type ChangeEvent } from "react";

interface DebounciableProp {
  onChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
}

type DebouncerProp = DebounciableProp & {
  onChangeWithDebouncer: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
};

type GetProps<T> = T extends React.FC<infer P> ? P : never;

export default function withDebouncer<T extends React.FC<DebounciableProp>>(
  DebounciableComponent: T,
  time: number,
) {
  return (props: GetProps<T> & DebouncerProp) => {
    const { onChange, onChangeWithDebouncer, ...propsRest } = props;

    const Component = DebounciableComponent as React.FC<DebounciableProp>;

    if (!onChangeWithDebouncer || time <= 0) {
      return <Component {...props}></Component>;
    }

    const timeoutRef = useRef<number>(null);

    const clear = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const onChangeOverride = (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
      clear();

      if (onChange) {
        onChange(event);
      }

      timeoutRef.current = setTimeout(() => {
        onChangeWithDebouncer(event);
      }, time);
    };

    useEffect(() => () => clear(), []);

    return <Component {...propsRest} onChange={onChangeOverride}></Component>;
  };
}
