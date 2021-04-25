import {shallow} from 'enzyme';
import BabylonScene from "./BabylonScene";

describe('BabylonScene', () => {
  test('renders without error', () => {
    const wrapper = shallow(<BabylonScene />);
    const gridCanvas = wrapper.find('[data-test="babylon-scene"]');
    expect(gridCanvas.exists()).toBe(true);
  });
});
