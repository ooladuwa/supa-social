import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const hp = (percentage: number) => {
  return (percentage / 100) * deviceHeight;
};

const wp = (percentage: number) => {
  return (percentage / 100) * deviceWidth;
};

export { hp, wp };
