import {shallow} from 'enzyme';
import App from './App';

test('renders without error', () => {
  const wrapper = shallow(<App />);
  const app = wrapper.find('[data-test="app"]');
  expect(app.exists()).toBe(true);
});
