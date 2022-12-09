import { Circle, Icon, Spinner, SquareProps } from "@chakra-ui/react";
import { HiCheck } from "react-icons/hi";

export interface StepCircleProps extends SquareProps {
  isCompleted: boolean;
  isActive: boolean;
  isProcessing: boolean;
}

export const StepCircle: React.FC<StepCircleProps> = ({ isCompleted, isActive, isProcessing, ...circleProps }) => {
  return (
    <Circle
      size="10"
      bg={isCompleted ? "accent" : "inherit"}
      borderWidth={isCompleted ? "0" : "2px"}
      borderColor={isActive ? "accent" : "inherit"}
      {...circleProps}
    >
      {isCompleted ? (
        <Icon as={HiCheck} color="inverted" boxSize="5" />
      ) : isActive ? (
        <>{isProcessing ? <Spinner color="accent" size="sm" /> : <Circle bg={"accent"} size="3" />}</>
      ) : (
        <Circle bg={"border"} size="3" />
      )}
    </Circle>
  );
};
