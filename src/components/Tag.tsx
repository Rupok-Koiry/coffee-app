import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";

type TagProps = {
  containerClassName: string;
  textClassName: string;
  children: React.ReactNode;
};

const Tag: React.FC<TagProps> = ({
  containerClassName,
  textClassName,
  children,
}) => {
  return (
    <View
      className={`bg-opacity-75 ${containerClassName} rounded-full px-2.5 py-0.5`}
    >
      <Text
        className={`text-xs font-poppins-medium uppercase ${textClassName} text-center`}
      >
        {children}
      </Text>
    </View>
  );
};
export default Tag;
